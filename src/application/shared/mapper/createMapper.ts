import { ProfileMappingError, ProfileNotFoundError } from './errors';
import {
  Mapper,
  Profile,
  ProfileKey,
  RegisteredProfile,
  RegisteredProfiles,
} from './types';

export function createMapper(): Mapper<RegisteredProfiles> {
  const profileMap = new Map<ProfileKey<RegisteredProfile>, RegisteredProfile>();

  function getProfile(
    sourceKey: RegisteredProfile['sourceKey'],
    destinationKey: RegisteredProfile['destinationKey'],
  ): RegisteredProfile {
    const key: ProfileKey<RegisteredProfile> = `${sourceKey}-${destinationKey}`;
    const profile = profileMap.get(key);

    if (!profile) {
      throw new ProfileNotFoundError(sourceKey, destinationKey);
    }

    return profile;
  }

  const register: Mapper<RegisteredProfiles>['register'] = (maybeProfiles) => {
    const profiles = Array.isArray(maybeProfiles) ? maybeProfiles : [maybeProfiles];

    for (const profile of profiles) {
      profileMap.set(`${profile.sourceKey}-${profile.destinationKey}`, profile);
    }
  };

  const has: Mapper<RegisteredProfiles>['has'] = (
    sourceKey: string,
    destinationKey: string,
  ) => {
    try {
      getProfile(sourceKey, destinationKey);
      return true;
    } catch {
      return false;
    }
  };

  const clear: Mapper<RegisteredProfiles>['clear'] = () => {
    profileMap.clear();
  };

  const map: Mapper<RegisteredProfiles>['map'] = (
    sourceKey,
    source,
    destinationKey,
  ) => {
    const profile = getProfile(sourceKey, destinationKey);

    try {
      return profile.map(source);
    } catch (exception) {
      throw new ProfileMappingError(profile, { cause: exception });
    }
  };

  const mapMany: Mapper<RegisteredProfiles>['mapMany'] = (
    sourceKey,
    sourceArray,
    destinationKey,
  ) => {
    const profile = getProfile(sourceKey, destinationKey);

    return sourceArray.map((source) => profile.map(source));
  };

  const mapper: Mapper<RegisteredProfiles> = {
    register,
    has,
    clear,
    map,
    mapMany,
  };

  return mapper;
}