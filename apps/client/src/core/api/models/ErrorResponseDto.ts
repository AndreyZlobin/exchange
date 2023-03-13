/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ErrorResponseDto = {
    /**
     * 400 | 401 | 403 | 500
     */
    statusCode: ErrorResponseDto.statusCode;
    message: string;
};

export namespace ErrorResponseDto {

    /**
     * 400 | 401 | 403 | 500
     */
    export enum statusCode {
        '_400' = 400,
        '_401' = 401,
        '_403' = 403,
        '_500' = 500,
    }


}
