--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    customer_id integer NOT NULL
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: carts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.carts ALTER COLUMN cart_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.carts_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: carts_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts_details (
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.carts_details OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    firstname character varying(256),
    surname character varying(256),
    lastname character varying(256),
    email character varying(256) NOT NULL,
    password character varying(256) NOT NULL,
    user_role character varying(32) DEFAULT 'USER'::character varying NOT NULL,
    CONSTRAINT chk_user_role CHECK ((((user_role)::text = 'ADMIN'::text) OR ((user_role)::text = 'USER'::text)))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customer_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    customer_id integer NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_details (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.orders_details OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders ALTER COLUMN order_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name text NOT NULL,
    manufacture text,
    category text,
    price real,
    description text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products ALTER COLUMN product_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    user_id integer NOT NULL,
    refresh_token character varying(256) NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (cart_id, customer_id) FROM stdin;
\.


--
-- Data for Name: carts_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts_details (cart_id, product_id, quantity) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, customer_id) FROM stdin;
1	2
\.


--
-- Data for Name: orders_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_details (order_id, product_id, quantity) FROM stdin;
1	4	7
1	5	10
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, product_name, manufacture, category, price, description) FROM stdin;
1	TV	Sony	electronics	125	full hd 4k android TV
2	TV	Sony	electronics	125	full hd 4k android TV
3	TV	Sony	electronics	125	full hd 4k android TV
4	TV	Sony	electronics	125	full hd 4k android TV
5	TV	Sony	electronics	125	full hd 4k android TV
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (user_id, refresh_token) FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJfcm9sZSI6IlVTRVIiLCJpYXQiOjE3MDIwNTU1NDMsImV4cCI6MTcwMjA1NzM0M30.o9Nt6hCEBrVWWMLTraG0kysxeJLUQflwCoG5sh8GrjU
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJfcm9sZSI6IlVTRVIiLCJpYXQiOjE3MDIxMjk3NjgsImV4cCI6MTcwMjEzMTU2OH0.wGFXBW1cJVldTm48Kw3XridaOhhe9MzsTTitiQOUIXk
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJfcm9sZSI6IkFETUlOIiwiaWF0IjoxNzAyMTQwMzMwLCJleHAiOjE3MDIxNDIxMzB9.0PB3fQQ1X5aJ2Oam4UJAevIR22j7NbYbc2QzQs5_rvU
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, firstname, surname, lastname, email, password, user_role) FROM stdin;
2	ilon	mask	petrovich	ilon@mask.pet	$2a$04$whKZAs6GEZDrX7VH9JZwtO2SrjjH3He3Gj8kRhc58X8xpTiSTTyp6	USER
1	vasia-loh	petrov	vasilievich	vasiliy@vasilievich.vas	$2a$04$mk6TbXanT8ZtI/jn8Acfy.TYXZf7MqbSVZdxh3ddQlIKnnVirMDZ.	USER
3	admin	adminov	adminovich	adminskaya@pochta.ad	$2a$04$cQzpAbcsjnp/qCZYFcZvgeuYjP8rhN9F8pt3Kluyn7ih9xQXPCmxK	ADMIN
\.


--
-- Name: carts_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_cart_id_seq', 1, true);


--
-- Name: customer_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_customer_id_seq', 3, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 1, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 5, true);


--
-- Name: carts pk_carts_cart_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT pk_carts_cart_id PRIMARY KEY (cart_id);


--
-- Name: users pk_customer_customer_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_customer_customer_id PRIMARY KEY (user_id);


--
-- Name: orders pk_orders_order_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT pk_orders_order_id PRIMARY KEY (order_id);


--
-- Name: products pk_products_product_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT pk_products_product_id PRIMARY KEY (product_id);


--
-- Name: tokens tokens_refresh_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_refresh_token_key UNIQUE (refresh_token);


--
-- Name: tokens tokens_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_user_id_key UNIQUE (user_id);


--
-- Name: carts unique_carts_customer_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT unique_carts_customer_id UNIQUE (customer_id);


--
-- Name: carts_details unique_product_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_details
    ADD CONSTRAINT unique_product_id UNIQUE (product_id);


--
-- Name: carts fk_carts_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fk_carts_customer_id FOREIGN KEY (customer_id) REFERENCES public.users(user_id);


--
-- Name: carts_details fk_carts_details_cart_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_details
    ADD CONSTRAINT fk_carts_details_cart_id FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);


--
-- Name: carts_details fk_carts_details_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_details
    ADD CONSTRAINT fk_carts_details_product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: orders fk_orders_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_customer_id FOREIGN KEY (customer_id) REFERENCES public.users(user_id);


--
-- Name: orders_details fk_orders_details_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_details
    ADD CONSTRAINT fk_orders_details_order_id FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: orders_details fk_orders_details_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_details
    ADD CONSTRAINT fk_orders_details_product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: tokens fk_tokens_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT fk_tokens_user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

