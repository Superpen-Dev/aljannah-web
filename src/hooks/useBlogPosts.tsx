
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  tags: string[] | null;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching blog posts...');
      console.log('Current user:', user?.id);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      console.log('Fetched posts:', data);
      setPosts((data || []) as BlogPost[]);
    } catch (err: any) {
      console.error('Error in fetchPosts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createPost = async (postData: Partial<BlogPost>) => {
    if (!user) {
      console.error('User not authenticated');
      throw new Error('User not authenticated');
    }

    try {
      console.log('Creating post with data:', postData);
      console.log('User ID:', user.id);
      
      const slug = generateSlug(postData.title || '');
      const insertData = {
        title: postData.title || '',
        content: postData.content || '',
        slug,
        author_id: user.id,
        excerpt: postData.excerpt || null,
        featured_image: postData.featured_image || null,
        status: postData.status || 'draft',
        tags: postData.tags || [],
        published_at: postData.status === 'published' ? (postData.published_at || new Date().toISOString()) : null
      };
      
      console.log('Insert data:', insertData);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        throw error;
      }
      
      console.log('Created post:', data);
      
      // Add the new post to the current list instead of refetching
      setPosts(currentPosts => [data as BlogPost, ...currentPosts]);
      
      return data;
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      console.log('Updating post:', id, postData);
      
      const updateData = {
        ...postData,
        published_at: postData.status === 'published' ? (postData.published_at || new Date().toISOString()) : postData.published_at
      };
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating post:', error);
        throw error;
      }
      
      console.log('Updated post:', data);
      
      // Update the post in the current list
      setPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === id ? { ...post, ...data } as BlogPost : post
        )
      );
      
      return data;
    } catch (error) {
      console.error('Error in updatePost:', error);
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      console.log('Deleting post:', id);
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting post:', error);
        throw error;
      }
      
      console.log('Deleted post:', id);
      
      // Remove the post from the current list
      setPosts(currentPosts => currentPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error in deletePost:', error);
      throw error;
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user, fetchPosts]);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
};

export const usePublishedPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublishedPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching published posts...');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching published posts:', error);
        throw error;
      }
      
      console.log('Fetched published posts:', data);
      setPosts((data || []) as BlogPost[]);
    } catch (err: any) {
      console.error('Error in fetchPublishedPosts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublishedPosts();
  }, [fetchPublishedPosts]);

  return { posts, loading, error, refetch: fetchPublishedPosts };
};
