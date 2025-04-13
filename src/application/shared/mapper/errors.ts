import { Profile } from './types';

export class ProfileNotFoundError extends Error {
    constructor(sourceKey: string, destinationKey: string) {
        super(`Profile not found for mapping from ${sourceKey} to ${destinationKey}`);
    }
}

export class ProfileMappingError extends Error {
    public cause?: any;

    constructor(profile: Profile<any, any, any, any>, options?: { cause?: any }) {
        super(
            `Error mapping from ${profile.sourceKey} to ${profile.destinationKey}: ${options?.cause}`,
        );
        this.cause = options?.cause;
    }
}