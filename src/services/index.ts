import { apiEndpoint } from './endpoint';
import { useUserService } from './User-services';
export const userService = useUserService(apiEndpoint);
