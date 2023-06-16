import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  'https://hpiumwvriuabsyhnntif.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaXVtd3ZyaXVhYnN5aG5udGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4OTM1NTgsImV4cCI6MjAwMjQ2OTU1OH0.hvLnQz4Q1C0dUll91ZaC33_4S5ibq-M8kvwdcbxo1Xw'
);


export default supabase;
