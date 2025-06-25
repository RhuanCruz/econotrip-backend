import { StatusCodes } from 'http-status-codes';

const Errors = {
  UNDOCUMENTED_ERROR: {
    title: 'Undocumented error',
    detail: 'Undocumented error',
    code: 'UNDOCUMENTED_ERROR',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  AUTH_UNAUTHORIZED: {
    title: 'Missing authorization header',
    detail: 'Missing authorization header',
    code: 'AUTH_UNAUTHORIZED',
    statusCode: StatusCodes.UNAUTHORIZED,
  },
  AUTH_TYPE_NOT_SUPPORTED: {
    title: 'Authentication type not supported',
    detail: 'Authentication type not supported',
    code: 'AUTH_TYPE_NOT_SUPPORTED',
    statusCode: StatusCodes.UNAUTHORIZED,
  },
  AUTH_TOKEN_INCORRECT: {
    title: 'Authentication token is incorrect',
    detail: 'Authentication token is incorrect',
    code: 'AUTH_TOKEN_INCORRECT',
    statusCode: StatusCodes.UNAUTHORIZED,
  },
  AUTH_FORBIDDEN: {
    title: 'Forbidden ',
    detail: 'Forbidden',
    code: 'AUTH_FORBIDDEN',
    statusCode: StatusCodes.FORBIDDEN,
  },
  ZOD_REQUIRED_FIELD: {
    title: 'Required field is missing',
    detail: 'Required field is missing',
    code: 'FIELD_REQUIRED',
    statusCode: StatusCodes.BAD_REQUEST,
  },
  ZOD_UNRECOGNIZED_FIELD: {
    title: 'Unrecognized field',
    detail: 'Unrecognized field',
    code: 'FIELD_UNRECOGNIZED',
    statusCode: StatusCodes.BAD_REQUEST,
  },
  ZOD_DEFAULT_ISSUE: {
    title: 'Default zod issue',
    detail: 'Default zod issue',
    code: 'FIELD_ISSUE',
    statusCode: StatusCodes.BAD_REQUEST,
  },
  ROLE_NOT_FOUND: {
    title: 'Role not found',
    detail: 'Role not found',
    code: 'ROLE_NOT_FOUND',
    statusCode: StatusCodes.NOT_FOUND,
  },
  ROLE_NOT_DELETED: {
    title: 'Role could not be deleted',
    detail: 'Role could not be deleted',
    code: 'ROLE_NOT_DELETED',
    statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  ROLE_CONFLICT: {
    title: 'Role name already in use',
    detail: 'Role name already in use',
    code: 'ROLE_CONFLICT',
    statusCode: StatusCodes.CONFLICT,
  },
  PERMISSION_NOT_FOUND: {
    title: 'Permission not found',
    detail: 'Permission not found',
    code: 'PERMISSION_NOT_FOUND',
    statusCode: StatusCodes.NOT_FOUND,
  },
  PERMISSION_NOT_DELETED: {
    title: 'Permission could not be deleted',
    detail: 'Permission could not be deleted',
    code: 'PERMISSION_NOT_DELETED',
    statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  PERMISSION_CONFLICT: {
    title: 'Permission name already in use',
    detail: 'Permission name already in use',
    code: 'PERMISSION_CONFLICT',
    statusCode: StatusCodes.CONFLICT,
  },
  USER_NOT_FOUND: {
    title: 'User not found',
    detail: 'User not found',
    code: 'USER_NOT_FOUND',
    statusCode: StatusCodes.NOT_FOUND,
  },
  USER_NOT_DELETED: {
    title: 'User could not be deleted',
    detail: 'User could not be deleted',
    code: 'USER_NOT_DELETED',
    statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  USER_LOGIN_CONFLICT: {
    title: 'User login already in use',
    detail: 'User login already in use',
    code: 'USER_LOGIN_CONFLICT',
    statusCode: StatusCodes.CONFLICT,
  },
  USER_EMAIL_CONFLICT: {
    title: 'User email already in use',
    detail: 'User email already in use',
    code: 'USER_EMAIL_CONFLICT',
    statusCode: StatusCodes.CONFLICT,
  },
  LOGIN_FAILED: {
    title: 'Login or password is incorrect',
    detail: 'Login or password is incorrect',
    code: 'LOGIN_FAILED',
    statusCode: StatusCodes.UNAUTHORIZED,
  },
  SKYSCANNER_INITIAL_SEARCH_FAILED: {
    title: 'Initial search from skyscanner failed',
    detail: 'Initial search from skyscanner failed',
    code: 'SKYSCANNER_INITIAL_SEARCH_FAILED',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  AMADEUS_LOGIN_FAILED: {
    title: 'Amadeus login failed',
    detail: 'Amadeus login failed',
    code: 'AMADEUS_LOGIN_FAILED',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  AMADEUS_SEARCH_FAILED: {
    title: 'Amadeus search failed',
    detail: 'Amadeus search failed',
    code: 'AMADEUS_SEARCH_FAILED',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  OPENAI_CHAT_FAILED: {
    title: 'OpenAi chat failed',
    detail: 'OpenAi chat failed',
    code: 'OPENAI_CHAT_FAILED',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  RADAR_NOT_FOUND: {
    title: 'Radar not found',
    detail: 'Radar not found',
    code: 'RADAR_NOT_FOUND',
    statusCode: StatusCodes.NOT_FOUND,
  },
  RADAR_NOT_DELETED: {
    title: 'Radar could not be deleted',
    detail: 'Radar could not be deleted',
    code: 'RADAR_NOT_DELETED',
    statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  RADAR_ROUTINE_NOT_CREATED: {
    title: 'Radar routine not created',
    detail: 'Radar routine not created',
    code: 'RADAR_ROUTINE_NOT_CREATED',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  RADAR_ROUTINE_NOT_DELETED: {
    title: 'Radar routine not deleted',
    detail: 'Radar routine not deleted',
    code: 'RADAR_ROUTINE_NOT_DELETED',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  RADAR_ROUTINE_RESULTS_NOT_LISTED: {
    title: 'Radar routine results not listed',
    detail: 'Radar routine results not listed',
    code: 'RADAR_ROUTINE_RESULTS_NOT_LISTED',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
};

export default Errors;
