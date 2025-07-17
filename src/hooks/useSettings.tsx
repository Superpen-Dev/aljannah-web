
import { useState, useEffect } from 'react';

interface Settings {
  // Personal Information
  displayName: string;
  email: string;
  secondaryEmail: string;
  bio: string;
  
  // Site Settings
  siteTitle: string;
  siteDescription: string;
  
  // Social Media
  instagram: string;
  facebook: string;
  linkedin: string;
  
  // Notifications
  emailNotifications: boolean;
  blogCommentNotifications: boolean;
  contactFormNotifications: boolean;
  
  // Security
  twoFactorAuth: boolean;
  sessionTimeout: number;
  
  // Content
  postsPerPage: number;
  worksPerPage: number;
  enableComments: boolean;
  moderateComments: boolean;
  
  // SEO & Analytics
  enableSEO: boolean;
  enableSitemap: boolean;
  enableAnalytics: boolean;
}

const defaultSettings: Settings = {
  displayName: 'AlJannah Adedamola Sanni',
  email: 'theartistlol9@gmail.com',
  secondaryEmail: 'sannialjanat30@gmail.com',
  bio: 'Multifaceted writer, poetess, and literary critic specializing in fiction, non-fiction, and academic writing across diverse themes including family, gender, mental health, and African society.',
  siteTitle: 'AlJannah Adedamola Sanni - Writer & Literary Critic',
  siteDescription: 'Professional website of AlJannah Adedamola Sanni, featuring literary works, blog posts, and insights on social work, mental health, and African literature.',
  instagram: 'https://instagram.com/theartistlol9',
  facebook: 'https://facebook.com/aljannahsanni',
  linkedin: 'https://linkedin.com/in/aljannah-sanni',
  emailNotifications: true,
  blogCommentNotifications: true,
  contactFormNotifications: true,
  twoFactorAuth: false,
  sessionTimeout: 30,
  postsPerPage: 9,
  worksPerPage: 12,
  enableComments: true,
  moderateComments: true,
  enableSEO: true,
  enableSitemap: true,
  enableAnalytics: false,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveSettings = async (newSettings: Settings) => {
    setLoading(true);
    setError(null);
    
    try {
      // Save to localStorage for now - in a real app this would save to database
      localStorage.setItem('app-settings', JSON.stringify(newSettings));
      setSettings(newSettings);
      console.log('Saving settings:', newSettings);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    setLoading(true);
    try {
      const savedSettings = localStorage.getItem('app-settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('app-settings');
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    saveSettings,
    resetSettings,
  };
};
