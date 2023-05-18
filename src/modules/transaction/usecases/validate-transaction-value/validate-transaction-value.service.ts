import { Injectable, Logger } from '@nestjs/common';
import { CommandExecutor } from '@modules/libs/domain/command/command-executor.interface';
import { concatMap, from, map, Observable, of, tap } from 'rxjs';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import { ValidateTransactionValueCommand } from '@src/modules/transaction/domain/command/validate-transaction-value/validate-transaction-value-command.interface';
import { ConfigService } from '@nestjs/config';
import { ConfigValue } from '@src/config/configuration/model/constants';
import { TransactionConsts } from '@src/modules/transaction/domain/constants/transaction-constants';
import { ProducerService } from '@src/config/kafka/producer.service';
import { KafkaConfig } from '@src/config/configuration/model/kafka-config';

@Injectable()
export class ValidateTransactionValue implements CommandExecutor<Transaction> {

	private readonly logger = new Logger(ValidateTransactionValue.name);


	constructor(
		private readonly configurationService: ConfigService,
		private readonly producerService: ProducerService){ }

	private readonly kafkaConfig: KafkaConfig = this.configurationService.get<KafkaConfig>(ConfigValue.STREAMS_KAFKA_ENV_VALUE);

	execute(command: ValidateTransactionValueCommand): Observable<Transaction> {

		/**
		 * Validate transaction value.
		 * update transaction state
		 * send transaction
		 */

		const ValidateTransactionValue = (_command: ValidateTransactionValueCommand): Observable<Transaction> => {
			const _transaction: Transaction = {
				id: _command.id,
				status: _command.value > TransactionConsts.maxTransactionValue ? TransactionConsts.transactionStatus.rejected : TransactionConsts.transactionStatus.approved
			}
			return of(_transaction).pipe(
				tap(() => this.logger.log(`Transaction with id: [${_transaction.id}] updated succesfully.`))
			);
		};

		const sendTransactionUpdated = (_transaction: Transaction): Observable<Transaction> => {
			const _topic = _transaction.status == TransactionConsts.transactionStatus.rejected ? this.kafkaConfig.bindings.topicName.sendTransactionStatusRejected : this.kafkaConfig.bindings.topicName.sendTransactionStatusApproved;
			return from( this.producerService.produce({topic: _topic, messages: [{value: JSON.stringify(_transaction)}] })).pipe(
				tap( () => this.logger.log('Send transaction updated status.')),
				map( () => _transaction)
			);
		};

		return of(command).pipe(
			concatMap( c => ValidateTransactionValue(c).pipe(
				concatMap ( t => sendTransactionUpdated(t))
			)),
		);

	}

}