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

-- Eliminar políticas existentes para evitar duplicados
DROP POLICY IF EXISTS "Permitir insert anonimo" ON encuestas;
DROP POLICY IF EXISTS "Solo admin puede leer" ON encuestas;
DROP POLICY IF EXISTS "Permitir lectura anonima" ON encuestas;

-- Permitir inserts anónimos (para que los visitantes puedan enviar encuestas)
CREATE POLICY "Permitir insert anonimo" ON encuestas
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Permitir lectura anónima (para que todos vean los comentarios)
CREATE POLICY "Permitir lectura anonima" ON encuestas
    FOR SELECT
    TO anon
    USING (true);