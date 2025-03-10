#!/usr/bin/env node

import { Command } from 'commander';
import { getProfiles, EVariant } from './browser';
import { exec } from 'child_process';

const program = new Command();

program
  .version('1.0.0')
  .description('Open browser with a specific profile')
  .requiredOption('-v, --variant <variant>', 'Chrome variant (CHROME, CHROME_CANARY, CHROMIUM)')
  .option('-p, --profile-name <profileName>', 'Profile name')
  .option('-u, --url <url>', 'URL to open')
  .option('-l, --list-profiles', 'List all available profiles')
  .action((options) => {
    const { url, variant, profileName, listProfiles } = options;

    const profiles = getProfiles(EVariant[variant as keyof typeof EVariant]);

    if (profiles.length === 0) {
      console.error('No profiles found.');
      process.exit(1);
    }

    if (listProfiles) {
      console.log('Available profiles:');
      profiles.forEach((profile, index) => {
        console.log(`${index + 1}. ${profile.displayName} (${profile.profileDirName})`);
      });
      process.exit(0);
    }

    if (!profileName) {
      console.error('Profile name is required.');
      process.exit(1);
    }

    const selectedProfile = profiles.find((profile) => profile.displayName === profileName);
    if (!selectedProfile) {
      console.error('Profile not found.');
      process.exit(1);
    }

    const command = `open -na "Google Chrome" --args --profile-directory="${selectedProfile.profileDirName}" "${url}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        process.exit(1);
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        process.exit(1);
      }
      console.log(`Command executed successfully: ${stdout}`);
    });
  });

program.parse(process.argv);
