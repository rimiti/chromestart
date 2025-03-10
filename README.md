# @rimiti/chromestart

[![License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]

## Description

This package aims to hightly improve the way you start your Chrome (and variant) browser. 
It allows you to start your browser with a specific profile, a specific url.

## Install

```
yarn add @rimiti/chromestart
```

## Examples

### Use it as a library

```ts
import { getProfiles } from '.';
import { EVariant } from './browser';

console.log(getProfiles(EVariant.CHROME));

[
    {
        displayName: 'dimitri.dobairro@dimsolution.com',
        profileDirName: 'Default',
        profileDirPath: '/Users/dimitri.dobairro@dimsolution.com/Library/Application Support/Google/Chrome/Default',
        profilePictureUrl: null
    },
    {
        displayName: 'example@dimsolution.com',
        profileDirName: 'John Doe',
        profileDirPath: '/Users/Profile 2/Library/Application Support/Google/Chrome/Default',
        profilePictureUrl: null
    }
]
```

### CLI

**Usage:**

```sh
$ chromestart --help
Usage: cli [options]

Open browser with a specific profile

Options:
  -V, --version                     output the version number
  -v, --variant <variant>           Chrome variant (CHROME, CHROME_CANARY, CHROMIUM)
  -p, --profile-name <profileName>  Profile name
  -u, --url <url>                   URL to open
  -l, --list-profiles               List all available profiles
  -h, --help                        display help for command
```

**Examples:**

```sh
# List all available profiles for the variant "CHROME"
$ chromestart -variant CHROME --list-profile

# Open Chrome with the profile "dimitri.dobairro@dimsolution.com" and the url "https://example.com"
$ chromestart --variant CHROME --profile-name "dimitri.dobairro@dimsolution.com" --url https://example.com
```


## License

MIT © [Dimitri DO BAIRRO](https://www.dimsolution.com)

[dependencies-badge]: https://img.shields.io/david/rimiti/chromestart
[dependencies]: https://img.shields.io/david/rimiti/chromestart
[build-badge]: https://github.com/rimiti/chromestart/workflows/Test/badge.svg
[build]: https://github.com/rimiti/chromestart/actions?query=workflow%3ATest+branch%3Amaster
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/rimiti/chromestart/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
