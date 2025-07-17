import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface LiteraryWork {
  id: string;
  title: string;
  type: 'novel' | 'short_story' | 'poem' | 'essay' | 'article';
  description: string | null;
  content: string | null;
  cover_image: string | null;
  status: 'draft' | 'published' | 'archived';
  tags: string[] | null;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useLiteraryWorks = () => {
  const [works, setWorks] = useState<LiteraryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('literary_works')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorks((data || []) as LiteraryWork[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWork = async (workData: Partial<LiteraryWork>) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('literary_works')
      .insert({
        title: workData.title || '',
        type: workData.type || 'article',
        author_id: user.id,
        description: workData.description,
        content: workData.content,
        cover_image: workData.cover_image,
        status: workData.status || 'draft',
        tags: workData.tags,
      })
      .select()
      .single();

    if (error) throw error;
    await fetchWorks();
    return data;
  };

  const updateWork = async (id: string, workData: Partial<LiteraryWork>) => {
    const { data, error } = await supabase
      .from('literary_works')
      .update(workData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    await fetchWorks();
    return data;
  };

  const deleteWork = async (id: string) => {
    const { error } = await supabase
      .from('literary_works')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchWorks();
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  return {
    works,
    loading,
    error,
    createWork,
    updateWork,
    deleteWork,
    refetch: fetchWorks,
  };
};

export const usePublishedWorks = () => {
  const [works, setWorks] = useState<LiteraryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublishedWorks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('literary_works')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setWorks((data || []) as LiteraryWork[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedWorks();
  }, []);

  return { works, loading, error };
};