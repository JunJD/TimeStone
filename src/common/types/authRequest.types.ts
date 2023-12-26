import { User } from 'src/modules/user/common/entity/user.entity';

export interface authRequest extends Request {
  user: User;
}
