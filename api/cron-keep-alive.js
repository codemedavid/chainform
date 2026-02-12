import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    try {
        const supabaseUrl = process.env.VITE_SUPABASE_URL;
        const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return res.status(500).json({ error: 'Supabase credentials missing' });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Perform a lightweight query to keep the database active
        const { data, error } = await supabase
            .from('site_settings')
            .select('count', { count: 'exact', head: true });

        if (error) {
            throw error;
        }

        return res.status(200).json({
            status: 'ok',
            message: 'Database check successful',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Database health check failed:', error);
        return res.status(500).json({
            error: 'Database health check failed',
            details: error.message
        });
    }
}
