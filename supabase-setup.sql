-- Crear tabla de encuestas de satisfacción
CREATE TABLE IF NOT EXISTS encuestas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    mensaje TEXT NOT NULL,
    referral TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE encuestas ENABLE ROW LEVEL SECURITY;

-- Permitir inserts anónimos (para que los visitantes puedan enviar encuestas)
CREATE POLICY "Permitir insert anonimo" ON encuestas
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Solo el admin puede leer
CREATE POLICY "Solo admin puede leer" ON encuestas
    FOR SELECT
    USING (auth.role() = 'service_role');