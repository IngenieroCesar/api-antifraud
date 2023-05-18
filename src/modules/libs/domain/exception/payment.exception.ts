import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictPaymentException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.CONFLICT);
	}
}

export class NotFoundPaymentException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.NOT_FOUND);
	}
}

export class BadRequestPaymentException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.BAD_REQUEST);
	}
}
