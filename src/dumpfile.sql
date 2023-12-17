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

--
-- Name: users_user_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_user_role_enum AS ENUM (
    'ADMIN',
    'CUSTOMER'
);


ALTER TYPE public.users_user_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: carts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_cart_id_seq OWNER TO postgres;

--
-- Name: carts_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_cart_id_seq OWNED BY public.carts.cart_id;


--
-- Name: carts_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts_details (
    cart_details_id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity real NOT NULL
);


ALTER TABLE public.carts_details OWNER TO postgres;

--
-- Name: carts_details_cart_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_details_cart_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_details_cart_details_id_seq OWNER TO postgres;

--
-- Name: carts_details_cart_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_details_cart_details_id_seq OWNED BY public.carts_details.cart_details_id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    order_date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_details (
    order_details_id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity real NOT NULL
);


ALTER TABLE public.orders_details OWNER TO postgres;

--
-- Name: orders_details_order_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_details_order_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_details_order_details_id_seq OWNER TO postgres;

--
-- Name: orders_details_order_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_details_order_details_id_seq OWNED BY public.orders_details.order_details_id;


--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying NOT NULL,
    manufacture character varying,
    category character varying,
    price real NOT NULL,
    description character varying
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_product_id_seq OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    user_id integer NOT NULL,
    refresh_token character varying NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    "firstName" character varying,
    "surName" character varying,
    "lastName" character varying,
    email character varying NOT NULL,
    password character varying NOT NULL,
    user_role public.users_user_role_enum DEFAULT 'CUSTOMER'::public.users_user_role_enum NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: carts cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN cart_id SET DEFAULT nextval('public.carts_cart_id_seq'::regclass);


--
-- Name: carts_details cart_details_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_details ALTER COLUMN cart_details_id SET DEFAULT nextval('public.carts_details_cart_details_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: orders_details order_details_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_details ALTER COLUMN order_details_id SET DEFAULT nextval('public.orders_details_order_details_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (cart_id, user_id) FROM stdin;
1	2
\.


--
-- Data for Name: carts_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts_details (cart_details_id, cart_id, product_id, quantity) FROM stdin;
3	1	4	1
4	1	3	10
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
2	1702806737741	UserRefactoring1702806737741
3	1702807181233	UserRefactoring1702807181233
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, user_id, order_date) FROM stdin;
3	2	2023-12-11 03:02:19.90275
4	2	2023-12-11 03:02:49.804837
\.


--
-- Data for Name: orders_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_details (order_details_id, order_id, product_id, quantity) FROM stdin;
5	3	1	7
6	3	3	10
7	4	1	7
8	4	3	10
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, product_name, manufacture, category, price, description) FROM stdin;
3	TV	Sony	electronics	125	full hd 4k android TV
4	TV	Sony	electronics	125	full hd 4k android TV
1	refrijerator	SAMSUNG	citchen	12	very cold
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (user_id, refresh_token) FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJfcm9sZSI6IlVTRVIiLCJpYXQiOjE3MDIyMzUyMTYsImV4cCI6MTcwMjIzNzAxNn0.HVsAV2vfIApziu392ibB_VbTwH18JZDnSEeEUT7GGQc
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJfcm9sZSI6IlVTRVIiLCJpYXQiOjE3MDIyNTQzNTEsImV4cCI6MTcwMjI1NjE1MX0.WN_GWcuw3zEUv9fRLEMlvQrd4xsNHl_go9zBy-xmXp0
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJfcm9sZSI6IkFETUlOIiwiaWF0IjoxNzAyNDgzNzQyLCJleHAiOjE3MDI0ODU1NDJ9.C4DRpe4gP54ATk3NhaJACFRvMAkxWJE0DHcjPHsP-ho
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJfcm9sZSI6IlVTRVIiLCJpYXQiOjE3MDI0OTgyNjQsImV4cCI6MTcwMjUwMDA2NH0.g8EIlrGnuxcol2QOHpu55F-qYdY4UK6b-pIEARuVoMM
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJfcm9sZSI6IlVTRVIiLCJpYXQiOjE3MDI0OTgzNjcsImV4cCI6MTcwMjUwMDE2N30.Sn0VgWZcZX-ZL_NN13_Wnd-zavF2xJlEhBFLrxq6uUA
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJfcm9sZSI6IlVTRVIiLCJpYXQiOjE3MDI0OTg0MjQsImV4cCI6MTcwMjUwMDIyNH0.8ze2BN9t--bneTHpOMcj4GMGWj9pJ8Lz0FDb049hTyM
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJfcm9sZSI6IlVTRVIiLCJpYXQiOjE3MDI0OTk2MTMsImV4cCI6MTcwMjUwMTQxM30.hUOnFd8Yw2XG98rILiDmvLqqIdDUWzoM9ZhRfuIT98o
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, "firstName", "surName", "lastName", email, password, user_role) FROM stdin;
3	admin	for_test	\N	admin@email.com	$2a$04$.h5oLh.nGo7wsqtmZrrpn.CsKT3PKQ8sSgNovpYtx2CclYtYdSInG	ADMIN
1	another	for	test	updated@email.com	$2a$04$YkM0E4ML7DnAV4/0g8HcVOGrXahOMWppBbsMNlCZCsFjfLn10YRKy	CUSTOMER
2	super	puper	test	test1@email.com	$2a$04$lO.qtm3OTuBvrlzf7KirluEPm.lFPj5hQbbPXydcE19ofBmSjtwOy	CUSTOMER
4	\N	\N	\N	test@email.com	$2a$04$NtvM9AwdN0s31lT7jM5RkeglpTnM/OQ1jYpCIBSpC5wmM0ntzIvue	CUSTOMER
5	\N	\N	\N	test2@email.com	$2a$04$R25EArBHaJYURlnsrMFLN.G5ZGVRMlCP0U/8NILOApbI9Tfnu0wx6	CUSTOMER
6	\N	\N	\N	test3@email.com	$2a$04$KiVNDiSd5fnfVU.Jzz1vUul7Ujfte1iu5JFw3Ig8SVLeZifktx/Im	CUSTOMER
7	\N	without	firstname	test4@email.com	$2a$04$dlf1MsUhKJcAbgRul.cINuIZsyjl8L7dulfMjn1nbnI.RuBLUDPOq	CUSTOMER
\.


--
-- Name: carts_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_cart_id_seq', 1, true);


--
-- Name: carts_details_cart_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_details_cart_details_id_seq', 4, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 3, true);


--
-- Name: orders_details_order_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_details_order_details_id_seq', 12, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 4, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 4, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 7, true);


--
-- Name: carts_details PK_0e50b2403eef26ee10cdd18e6d4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_details
    ADD CONSTRAINT "PK_0e50b2403eef26ee10cdd18e6d4" PRIMARY KEY (cart_details_id);


--
-- Name: carts PK_2fb47cbe0c6f182bb31c66689e9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "PK_2fb47cbe0c6f182bb31c66689e9" PRIMARY KEY (cart_id);


--
-- Name: tokens PK_8769073e38c365f315426554ca5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "PK_8769073e38c365f315426554ca5" PRIMARY KEY (user_id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: users PK_96aac72f1574b88752e9fb00089; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY (user_id);


--
-- Name: products PK_a8940a4bf3b90bd7ac15c8f4dd9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY (product_id);


--
-- Name: orders_details PK_c99e622f3cb93e6cffc6a5bd17b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_details
    ADD CONSTRAINT "PK_c99e622f3cb93e6cffc6a5bd17b" PRIMARY KEY (order_details_id);


--
-- Name: orders PK_cad55b3cb25b38be94d2ce831db; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY (order_id);


--
-- Name: carts UQ_2ec1c94a977b940d85a4f498aea; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "UQ_2ec1c94a977b940d85a4f498aea" UNIQUE (user_id);


--
-- Name: tokens UQ_66b773780ac1e48b1494885208b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "UQ_66b773780ac1e48b1494885208b" UNIQUE (refresh_token);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: carts FK_2ec1c94a977b940d85a4f498aea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: carts_details FK_3fa1b7714e35c13c9c8bb2d064b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_details
    ADD CONSTRAINT "FK_3fa1b7714e35c13c9c8bb2d064b" FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: tokens FK_8769073e38c365f315426554ca5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: orders FK_a922b820eeef29ac1c6800e826a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: carts_details FK_c58a8bdc72c918c2f50b16035c4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts_details
    ADD CONSTRAINT "FK_c58a8bdc72c918c2f50b16035c4" FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);


--
-- Name: orders_details FK_e5e110d720f2ff13a3ef9c45765; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_details
    ADD CONSTRAINT "FK_e5e110d720f2ff13a3ef9c45765" FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: orders_details FK_f5cefb92297d781e62607b608fd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_details
    ADD CONSTRAINT "FK_f5cefb92297d781e62607b608fd" FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- PostgreSQL database dump complete
--

