import { DoingFactory } from '../MessageFactory';

export class Movement extends DoingFactory{
	do(): void {
		console.log('Movimiento');
	}
}