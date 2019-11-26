import { ICUMessageSyntax } from '../types/intl';

export interface Arguments {
  [key: string]: any;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 *
 * @param message - conforming to ICU message syntax
 * @param args - if the message requires arguments pass them in this object or an error is thrown
 */
export default function formatMessage(
  message: ICUMessageSyntax,
  args: Arguments = {},
) {
  return message.replace(/\{([^}]+)\}/g, (_: string, arg_name: string) => {
    if (hasOwnProperty.call(args, arg_name) === false) {
      throw new Error(`Message required '${arg_name}' to be present.`);
    }
    return String(args[arg_name]);
  });
}
