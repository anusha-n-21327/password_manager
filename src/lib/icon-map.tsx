import {
  Globe,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitch,
  Reddit,
  Gitlab,
  Dribbble,
  Figma,
  Codepen,
  Mail,
  Apple,
} from 'lucide-react';
import React from 'react';

const iconMap: { [key: string]: React.ElementType } = {
  github: Github,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitch: Twitch,
  reddit: Reddit,
  gitlab: Gitlab,
  dribbble: Dribbble,
  figma: Figma,
  codepen: Codepen,
  mail: Mail,
  email: Mail,
  apple: Apple,
};

export const getIconForWebsite = (website: string): React.ElementType => {
  if (typeof website !== 'string' || !website) {
    return Globe;
  }
  const lowerCaseWebsite = website.toLowerCase();
  for (const key in iconMap) {
    if (lowerCaseWebsite.includes(key)) {
      return iconMap[key];
    }
  }
  return Globe; // Default icon for unmatched websites
};