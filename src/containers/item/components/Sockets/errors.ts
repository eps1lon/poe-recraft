import { BaseError } from 'make-error';

/**
 * thrown if one tries to add more sockets to an Item than it can hold
 */
export class SocketOverflow extends BaseError {
  constructor(limit: number) {
    super(`This item can't have more than ${limit} sockets`);
  }
}

export class LinkNonExistingSockets extends BaseError {
  constructor() {
    super('Tried to link two sockets that do not exist on this Item.');
  }
}

export class ColorNonExistingSocket extends BaseError {
  constructor() {
    super('Tried to color a socket that does not exist.');
  }
}

export class ArgumentError extends BaseError {}
