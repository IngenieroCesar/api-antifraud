import { Model } from '@src/modules/libs/domain/model/model.interface';

export interface Transaction extends Model {
	id: string;
	status: 'pending' | 'approved' | 'rejected';
}
