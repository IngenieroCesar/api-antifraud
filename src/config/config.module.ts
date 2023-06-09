import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './metrics/health.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/configuration/configuration';
import { AppLoggerService } from './logger/app.logger.service';
import secretsConfiguration from '@config/configuration/secrets-configuration';
/**
 * General module definition, setup configuration for Metrics, Logger and Config loader
 */
@Module({
	imports: [
		TerminusModule,
		ConfigModule.forRoot({
			load: [configuration, secretsConfiguration],
			isGlobal: true
		}),
	],
	controllers: [HealthController],
	providers: [AppLoggerService],
	exports: [AppLoggerService]
})
export class ConfigurationModule { }
