import { Module } from '@nestjs/common';
import { TransactionsController } from './aplication/rest/transactions.controller';
import { ValidateTransactionValue } from './usecases/validate-transaction-value/validate-transaction-value.service';
import { KafkaModule } from '@src/config/kafka/kafka.module';

@Module({
	controllers: [TransactionsController],
	imports: [KafkaModule],
	providers: [
		{ provide: 'ValidateTransactionValue', useClass: ValidateTransactionValue },
	]
})
export class TransactionModule { }