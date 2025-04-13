export interface Mapper<TProfiles extends Profile<any, any, any, any>[]> {
  register(
    profiles: Profile<any, any, any, any> | Profile<any, any, any, any>[],
  ): void;
  has(sourceKey: string, destinationKey: string): boolean;
  clear(): void;
  map<
    TSourceKey extends string,
    TSource,
    TDestinationKey extends string,
    TDestination,
  >(
    sourceKey: TSourceKey,
    source: TSource,
    destinationKey: TDestinationKey,
  ): TDestination;
  mapMany<
    TSourceKey extends string,
    TSource,
    TDestinationKey extends string,
    TDestination,
  >(
    sourceKey: TSourceKey,
    sources: TSource[],
    destinationKey: TDestinationKey,
  ): TDestination[];
}

export interface Profile<
  TSourceKey extends string,
  TSource,
  TDestinationKey extends string,
  TDestination,
> {
  sourceKey: TSourceKey;
  destinationKey: TDestinationKey;
  map: (source: TSource) => TDestination;
}

export type ProfileKey<TProfile extends Profile<string, any, string, any>> =
  `${TProfile['sourceKey']}-${TProfile['destinationKey']}`;

export type RegisteredProfile = Profile<string, any, string, any>;
export type RegisteredProfiles = RegisteredProfile[];