import { TransactionsController } from './transactions.controller';
import { ConfigService } from '@nestjs/config';
import { ValidateTransactionValue } from '@src/modules/transaction/usecases/validate-transaction-value/validate-transaction-value.service';
import { ProducerService } from '@src/config/kafka/producer.service';
import { ConsumerService } from '@src/config/kafka/consumer.service';

/**
 * Unit test for TransactionsController
 */
describe('TransactionsController', () => {
	let configService: ConfigService;
	let controller: TransactionsController;
	let producer: ProducerService;
	let consumer: ConsumerService;
	let validateTransactionValue: ValidateTransactionValue;

	beforeEach(() => {
		configService = new ConfigService();
		validateTransactionValue = new ValidateTransactionValue(configService, producer);
		controller = new TransactionsController(validateTransactionValue, consumer, configService );
	});

	it('should be defined', () => {

		expect(controller).toBeDefined();

	});

});
