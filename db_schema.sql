
/*
========================================================
ELIMINAR POLICIES (si existen)
========================================================
*/

DROP POLICY IF EXISTS read_publicaciones
ON public.publicaciones_blog;

DROP POLICY IF EXISTS read_etiquetas
ON public.etiquetas;

DROP POLICY IF EXISTS read_publicaciones_etiquetas
ON public.publicaciones_etiquetas;

DROP POLICY IF EXISTS insert_publicaciones
ON public.publicaciones_blog;

DROP POLICY IF EXISTS update_publicaciones
ON public.publicaciones_blog;

DROP POLICY IF EXISTS delete_publicaciones
ON public.publicaciones_blog;

DROP POLICY IF EXISTS app_server_publicaciones_all
ON public.publicaciones_blog;

DROP POLICY IF EXISTS app_server_etiquetas_all
ON public.etiquetas;

DROP POLICY IF EXISTS app_server_pub_etq_all
ON public.publicaciones_etiquetas;

DROP POLICY IF EXISTS app_server_contacto_insert
ON public.mensajes_contacto;

DROP POLICY IF EXISTS app_server_contacto_select
ON public.mensajes_contacto;

/*
========================================================
ELIMINAR TRIGGER (si existe)
========================================================
*/

DROP TRIGGER IF EXISTS trigger_crear_etiqueta
ON publicaciones_blog;



/*
========================================================
ELIMINAR TABLAS (si existen)
========================================================
*/

DROP TABLE IF EXISTS publicaciones_etiquetas CASCADE;
DROP TABLE IF EXISTS publicaciones_blog CASCADE;
DROP TABLE IF EXISTS etiquetas CASCADE;
DROP TABLE IF EXISTS mensajes_contacto CASCADE;

/*
========================================================
TABLA: publicaciones_blog
========================================================
*/

CREATE TABLE publicaciones_blog (
    id SERIAL PRIMARY KEY,

    titulo VARCHAR(255) NOT NULL,

    slug VARCHAR(255) UNIQUE NOT NULL,

    resumen TEXT,

    contenido TEXT,

    imagen_portada TEXT,

    estado VARCHAR(50) NOT NULL DEFAULT 'borrador'
        CHECK (estado IN ('borrador', 'publicado')),

    publicado_en TIMESTAMP,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*
========================================================
TABLA: etiquetas
========================================================
*/

CREATE TABLE etiquetas (
    id SERIAL PRIMARY KEY,

    nombre VARCHAR(100) UNIQUE NOT NULL
);

/*
========================================================
TABLA: publicaciones_etiquetas
========================================================
*/

CREATE TABLE publicaciones_etiquetas (
    publicacion_id INT NOT NULL,
    etiqueta_id INT NOT NULL,

    PRIMARY KEY (publicacion_id, etiqueta_id),

    CONSTRAINT fk_pub_etq_publicacion
        FOREIGN KEY (publicacion_id)
        REFERENCES publicaciones_blog(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pub_etq_etiqueta
        FOREIGN KEY (etiqueta_id)
        REFERENCES etiquetas(id)
        ON DELETE CASCADE
);

/*
========================================================
TABLA: mensajes_contacto
========================================================
*/

CREATE TABLE mensajes_contacto (
    id SERIAL PRIMARY KEY,

    nombre VARCHAR(150) NOT NULL,

    correo VARCHAR(255) NOT NULL,

    asunto VARCHAR(255) NOT NULL,

    mensaje TEXT NOT NULL,

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*
========================================================
ÍNDICES
========================================================
*/

CREATE INDEX IF NOT EXISTS idx_publicaciones_estado
    ON publicaciones_blog(estado);

CREATE INDEX IF NOT EXISTS idx_publicaciones_fecha
    ON publicaciones_blog(publicado_en);

CREATE INDEX IF NOT EXISTS idx_pub_etq_publicacion
    ON publicaciones_etiquetas(publicacion_id);

CREATE INDEX IF NOT EXISTS idx_pub_etq_etiqueta
    ON publicaciones_etiquetas(etiqueta_id);

/*
========================================================
VERIFICAR RLS
========================================================
*/

SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
    'publicaciones_blog',
    'etiquetas',
    'publicaciones_etiquetas',
    'mensajes_contacto'
);

/*
========================================================
PERMISOS BASE
========================================================
*/

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON ALL TABLES IN SCHEMA public
TO anon, authenticated;

/*
========================================================
HABILITAR RLS
========================================================
*/

ALTER TABLE publicaciones_blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE etiquetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE publicaciones_etiquetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes_contacto ENABLE ROW LEVEL SECURITY;

/*
========================================================
LECTURA PÚBLICA
========================================================
*/

CREATE POLICY read_publicaciones
ON public.publicaciones_blog
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY read_etiquetas
ON public.etiquetas
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY read_publicaciones_etiquetas
ON public.publicaciones_etiquetas
FOR SELECT
TO anon, authenticated
USING (true);

/*
========================================================
CRUD publicaciones_blog
========================================================
*/

CREATE POLICY insert_publicaciones
ON public.publicaciones_blog
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY update_publicaciones
ON public.publicaciones_blog
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY delete_publicaciones
ON public.publicaciones_blog
FOR DELETE
TO authenticated
USING (true);

/*
========================================================
FUNCIÓN TRIGGER
========================================================
*/

CREATE OR REPLACE FUNCTION crear_etiqueta_post()
RETURNS TRIGGER AS $$
BEGIN

    INSERT INTO etiquetas (nombre)
    VALUES (NEW.titulo)
    ON CONFLICT (nombre) DO NOTHING;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

/*
========================================================
TRIGGER
========================================================
*/

CREATE TRIGGER trigger_crear_etiqueta
AFTER INSERT ON publicaciones_blog
FOR EACH ROW
EXECUTE FUNCTION crear_etiqueta_post();

/*
========================================================
ROL app_server
========================================================
*/

DO $$
BEGIN

    IF NOT EXISTS (
        SELECT FROM pg_roles
        WHERE rolname = 'app_server'
    ) THEN

        CREATE ROLE app_server
        LOGIN
        PASSWORD 'con123';

    END IF;

END
$$;

/*
========================================================
PERMISOS app_server
========================================================
*/

GRANT USAGE ON SCHEMA public
TO app_server;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.publicaciones_blog,
   public.etiquetas,
   public.publicaciones_etiquetas,
   public.mensajes_contacto
TO app_server;

/*
========================================================
POLICIES app_server
========================================================
*/

CREATE POLICY app_server_publicaciones_all
ON public.publicaciones_blog
FOR ALL
TO app_server
USING (true)
WITH CHECK (true);

CREATE POLICY app_server_etiquetas_all
ON public.etiquetas
FOR ALL
TO app_server
USING (true)
WITH CHECK (true);

CREATE POLICY app_server_pub_etq_all
ON public.publicaciones_etiquetas
FOR ALL
TO app_server
USING (true)
WITH CHECK (true);

CREATE POLICY app_server_contacto_insert
ON public.mensajes_contacto
FOR INSERT
TO app_server
WITH CHECK (true);

CREATE POLICY app_server_contacto_select
ON public.mensajes_contacto
FOR SELECT
TO app_server
USING (true);

