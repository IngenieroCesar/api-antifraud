import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictCategoryException extends HttpException {

	constructor(response: string) {
		super(response, HttpStatus.CONFLICT);
	}
}

export class NotFoundCategoryException extends HttpException {

	constructor(response: string) {
		super(response, HttpStatus.NOT_FOUND);
	}
}

export class BadRequestCategoryException extends HttpException {

	constructor(response: string) {
		super(response, HttpStatus.BAD_REQUEST);
	}
}
