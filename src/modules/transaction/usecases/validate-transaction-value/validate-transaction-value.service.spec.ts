import { ConfigService } from '@nestjs/config';
import { ValidateTransactionValue } from './validate-transaction-value.service';
import { ProducerService } from '@src/config/kafka/producer.service';

describe('ValidateTransactionValue', () => {
	let configService: ConfigService;
	let producer: ProducerService;
	let service: ValidateTransactionValue;

	beforeEach(async () => {
		configService = new ConfigService();
		service = new ValidateTransactionValue(configService, producer);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
