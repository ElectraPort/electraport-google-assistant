const Command = require('../../functions/commands/thermostattemperaturesetpointhigh.js');

describe('ThermostatTemperatureSetpointHigh Command', () => {
  const params = { thermostatTemperatureSetpointHigh: 20 };

  test('validateParams', () => {
    expect(Command.validateParams({})).toBe(false);
    expect(Command.validateParams(params)).toBe(true);
  });

  test('requiresItem', () => {
    expect(Command.requiresItem()).toBe(true);
  });

  test('getItemName', () => {
    expect(() => {
      Command.getItemNameAndState({ name: 'Item' });
    }).toThrow();
    const item = {
      members: [
        {
          name: 'SetpointItem',
          state: '20',
          metadata: {
            ga: {
              value: 'thermostatTemperatureSetpointHigh'
            }
          }
        }
      ]
    };
    expect(Command.getItemNameAndState(item)).toStrictEqual({ name: 'SetpointItem', state: '20' });
  });

  test('convertParamsToValue', () => {
    const item = {
      metadata: {
        ga: {
          config: {
            useFahrenheit: true
          }
        }
      }
    };
    expect(Command.convertParamsToValue(params, item)).toBe('68');
    expect(Command.convertParamsToValue(params, {})).toBe('20');
  });

  test('getResponseStates', () => {
    const item = {
      members: [
        {
          metadata: {
            ga: {
              value: 'thermostatTemperatureSetpointHigh'
            }
          }
        }
      ]
    };
    expect(Command.getResponseStates(params, item)).toStrictEqual({ thermostatTemperatureSetpointHigh: 20 });
  });
});
