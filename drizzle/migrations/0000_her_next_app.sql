CREATE TABLE public.business_memory (
  user_id uuid PRIMARY KEY,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  memory jsonb NOT NULL DEFAULT '{}'::jsonb,
  onboarded boolean NOT NULL DEFAULT false,
  confirmed boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_memory TO authenticated;
GRANT ALL ON public.business_memory TO service_role;
ALTER TABLE public.business_memory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own memory" ON public.business_memory FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  why text,
  area text NOT NULL,
  workflow_key text,
  priority int NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'todo',
  week_of date NOT NULL DEFAULT (date_trunc('week', now()))::date,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.actions TO authenticated;
GRANT ALL ON public.actions TO service_role;
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own actions" ON public.actions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX actions_user_idx ON public.actions(user_id, week_of);

CREATE TABLE public.vault_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  folder text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  workflow_key text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vault_items TO authenticated;
GRANT ALL ON public.vault_items TO service_role;
ALTER TABLE public.vault_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own vault" ON public.vault_items FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.ai_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  kind text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.ai_usage TO authenticated;
GRANT ALL ON public.ai_usage TO service_role;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own usage read" ON public.ai_usage FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own usage insert" ON public.ai_usage FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);