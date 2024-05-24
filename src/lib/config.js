export default {
  // Server port
  port: parseInt(process.env.PORT || 4000),
  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: boolOrString(process.env.TRUST_PROXY || 'loopback, linklocal, uniquelocal'),
  //  The Movie Database Access Token. Configure to use TMDB rather than cinemeta.
  tmdbAccessToken: process.env.TMDB_ACCESS_TOKEN || '', 
  // Data folder for cache database, torrent files ... Must be persistent in production
  dataFolder: process.env.DATA_FOLDER || '/tmp',
  // Enable localtunnel feature
  localtunnel: (process.env.LOCALTUNNEL || 'false') === 'true',
  // Addon ID
  addonId: process.env.ADDON_ID || 'community.stremio.davio',
  // Addon Name
  addonName: process.env.ADDON_NAME || 'Davio',
  // Addon Description
  addonDescription: process.env.ADDON_DESCRIPTION || 'Stremio addon that resolve streams using Webdav.',
  // Addon Icon
  addonIcon: process.env.ADDON_ICON || 'https://i.imgur.com/GptSzgL.png',
  // List of config keys that user can't configure
  // immulatableUserConfigKeys: commaListToArray(process.env.IMMULATABLE_USER_CONFIG_KEYS || ''),
  // Welcome message in /configure page. Markdown format
  welcomeMessage: process.env.WELCOME_MESSAGE || '',
  // Trust the cf-connecting-ip header
  trustCfIpHeader: (process.env.TRUST_CF_IP_HEADER || 'false') === 'true',
  // Rate limit interval in seconds to resolve stream
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || 60 * 60),
  // Rate limit the number of requests to resolve stream
  rateLimitRequest: parseInt(process.env.RATE_LIMIT_REQUEST || 150),

  defaultUserConfig: {},

  davs: [
    {
      id: 'realdebrid',
      name: 'Real-Debrid',
      fields: {
        shortName: 'RD',
        url: 'https://dav.real-debrid.com'
      },
      configFields: [
        {type: 'text',      name: 'username',    label: 'Username',            required: true,  value: ''},
        {type: 'password',  name: 'password',    label: 'WebDAV Password',     required: true,  value: '', href: {value: 'https://real-debrid.com/account', label: 'Get WebDAV Password Here'}},
        {type: 'text',      name: 'root',        label: 'Root Folder',         required: true,  value: '/'}
      ]
    },
    {
      id: 'debridlink',
      name: 'Debrid-Link',
      fields: {
        shortName: 'DL',
        url: 'https://webdav.debrid.link'
      },
      configFields: [
        {type: 'text',      name: 'username',    label: 'Username',            required: true,  value: ''},
        {type: 'text',      name: 'password',    label: 'Passkey',             required: true,  value: '', href: {value: 'https://debrid-link.com/webapp/account', label: 'Get Passkey Here'}},
        {type: 'text',      name: 'root',        label: 'Root Folder',         required: true,  value: '/'}
      ]
    },
    {
      id: 'custom',
      name: 'Custom',
      fields: {},
      configFields: [
        {type: 'text',      name: 'shortName',   label: 'Short Name',          required: true,  value: 'DAV', infos: `This value will be displayed in the description of each stream. [ShortName+]`},
        {type: 'text',      name: 'url',         label: 'WebDAV URL',          required: true,  value: ''},
        {type: 'text',      name: 'username',    label: 'Username',            required: false, value: ''},
        {type: 'text',      name: 'password',    label: 'Password',            required: false, value: ''},
        {type: 'text',      name: 'root',        label: 'Root Folder',         required: true,  value: '/'}
      ]  
    }
  ],

  qualities: [
    {value: 0, label: 'Unknown'},
    {value: 360, label: '360p'},
    {value: 480, label: '480p'},
    {value: 720, label: '720p'},
    {value: 1080, label: '1080p'},
    {value: 2160, label: '4K'}
  ],

  // sorts: [],
  
  languages: [
    {value: 'multi',      emoji: '🌎', pattern: 'multi'},
    {value: 'arabic',     emoji: '🇦🇪', pattern: 'arabic'},
    {value: 'chinese',    emoji: '🇨🇳', pattern: 'chinese'},
    {value: 'german',     emoji: '🇩🇪', pattern: 'german'},
    {value: 'english',    emoji: '🇺🇸', pattern: '(eng(lish)?)'},
    {value: 'spanish',    emoji: '🇪🇸', pattern: 'spa(nish)?'},
    {value: 'french',     emoji: '🇫🇷', pattern: 'fre(nch)?'},
    {value: 'dutch',      emoji: '🇳🇱', pattern: 'dutch'},
    {value: 'italian',    emoji: '🇮🇹', pattern: 'ita(lian)?'},
    {value: 'korean',     emoji: '🇰🇷', pattern: 'korean'},
    {value: 'portuguese', emoji: '🇵🇹', pattern: 'portuguese'},
    {value: 'russian',    emoji: '🇷🇺', pattern: 'rus(sian)?'},
    {value: 'swedish',    emoji: '🇸🇪', pattern: 'swedish'},
    {value: 'tamil',      emoji: '🇮🇳', pattern: 'tamil'},
    {value: 'turkish',    emoji: '🇹🇷', pattern: 'turkish'}
  ].map(lang => {
    lang.label = `${lang.emoji} ${lang.value.charAt(0).toUpperCase() + lang.value.slice(1)}`;
    lang.pattern = new RegExp(` ${lang.pattern} `, 'i');
    return lang;
  })
}

function commaListToArray(str){
  return str.split(',').map(str => str.trim()).filter(Boolean);
}

function sortCommaListToArray(str){
  return commaListToArray(str).map(sort => {
    const [key, reverse] = sort.split(':');
    return [key.trim(), reverse.trim() == 'true'];
  });
}

function boolOrString(str){
  if(str.trim().toLowerCase() == 'true'){
    return true;
  }else if(str.trim().toLowerCase() == 'false'){
    return false;
  }else{
    return str.trim();
  }
}