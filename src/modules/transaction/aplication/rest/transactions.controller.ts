import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { CommandExecutor } from '@src/modules/libs/domain/command/command-executor.interface';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import { lastValueFrom } from 'rxjs';
import { ConsumerService } from '@src/config/kafka/consumer.service';
import { ConfigService } from '@nestjs/config';
import { KafkaConfig } from '@src/config/configuration/model/kafka-config';
import { ConfigValue } from '@src/config/configuration/model/constants';

/**
 * @TransactionsController is responsible for handling incoming requests and returning responses to the transaction.
 */

@Controller('transactions')

export class TransactionsController implements OnModuleInit{

	constructor(
		@Inject('ValidateTransactionValue') private validateTransactionValue: CommandExecutor<Transaction>,
		private readonly consumerService: ConsumerService,
		private readonly configurationService: ConfigService
	) { }

	private readonly kafkaConfig: KafkaConfig = this.configurationService.get<KafkaConfig>(ConfigValue.STREAMS_KAFKA_ENV_VALUE);

	async onModuleInit() : Promise<void> {

		await this.consumerService.consume(
			this.kafkaConfig.bindings.topicName.sendTransactionCreated,
			{topic: this.kafkaConfig.bindings.topicName.sendTransactionCreated},
			{
				eachMessage: async ({topic, partition, message}) => {
					await lastValueFrom(this.validateTransactionValue.execute(JSON.parse(message.value.toString())));
				}
			});
	}

}
