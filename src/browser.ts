import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import File from 'phylo';
import { fsExistsSync } from './utils/fs';

const osType: 'macOS' | 'windows' | 'linux' = process.platform === 'darwin' ? 'macOS' : process.platform === 'win32' ? 'windows' : 'linux';

enum EVariant {
  CHROME = 'CHROME',
  CHROME_CANARY = 'CHROME_CANARY',
  CHROMIUM = 'CHROMIUM',
}

const locations = {
  macOS: [
    { name: EVariant.CHROME, path: `${os.homedir()}/Library/Application Support/Google/Chrome` },
    { name: EVariant.CHROME_CANARY, path: `${os.homedir()}/Library/Application Support/Google/Chrome Canary` },
    { name: EVariant.CHROMIUM, path: `${os.homedir()}/Library/Application Support/Chromium` },
  ],
  windows: [
    { name: EVariant.CHROME, path: `${process.env.LOCALAPPDATA}\\Google\\Chrome\\User Data` },
    { name: EVariant.CHROME_CANARY, path: `${process.env.LOCALAPPDATA}\\Google\\Chrome SxS\\User Data` },
    { name: EVariant.CHROMIUM, path: `${process.env.LOCALAPPDATA}\\Chromium\\User Data` },
  ],
  linux: [
    { name: EVariant.CHROME, path: `${os.homedir()}/.config/google-chrome` },
    { name: EVariant.CHROME, CHROME_CANARY: `${os.homedir()}/.config/google-chrome-beta` },
    { name: EVariant.CHROMIUM, path: `${os.homedir()}/.config/chromium` },
  ],
};

interface Profile {
  displayName: string;
  profileDirName: string;
  profileDirPath: string;
  profilePictureUrl: string | null;
}

/**
 * Get all profiles for a given variant.
 */
const getProfiles = (variant: EVariant): Profile[] => {
  const variantPath = locations[osType].find((v) => v.name === variant).path;

  return fs
      .readdirSync(variantPath)
    .filter((f) => f !== 'System Profile' && fsExistsSync(path.join(variantPath, f, 'Preferences')))
    .map((p) => {
      const profileInfo = File.from(path.join(variantPath, p, 'Preferences')).load({ type: 'json' });

      return {
        displayName: profileInfo.profile.name,
        profileDirName: p,
        profileDirPath: path.join(variantPath, p),
        profilePictureUrl: profileInfo.profile.gaia_info_picture_url || null,
      };
    });
};

export { getProfiles, EVariant, Profile };
