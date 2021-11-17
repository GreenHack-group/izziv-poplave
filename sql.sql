/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     7. 11. 2021 02:50:26                         */
/*==============================================================*/


drop table if exists JE_V_BLIZINI;

drop table if exists MERITEV;

drop table if exists POSTAJA;

drop table if exists UPORABNIK;

/*==============================================================*/
/* Table: JE_V_BLIZINI                                          */
/*==============================================================*/
create table JE_V_BLIZINI
(
   TOKEN                varchar(50) not null,
   SIFRA_POSTAJA        int not null,
   primary key (TOKEN, SIFRA_POSTAJA)
);

/*==============================================================*/
/* Table: MERITEV                                               */
/*==============================================================*/
create table MERITEV
(
   SIFRA_POSTAJA        int not null,
   DATUM_CAS            datetime not null,
   VODOSTAJ             float,
   PRETOK               float,
   TEMPERATURA_VODA     float,
   ZNACILNA_VISINA_VALOV float,
   primary key (SIFRA_POSTAJA, DATUM_CAS)
);

/*==============================================================*/
/* Table: POSTAJA                                               */
/*==============================================================*/
create table POSTAJA
(
   SIFRA_POSTAJA        int not null,
   IME_POSTAJA          varchar(30) not null,
   GE_DOLZINA           float(13) not null,
   GE_SIRINA            float(13) not null,
   RADIJ                int not null,
   REKA                 varchar(30) not null,
   ZADNJA_SPREMEMBA     datetime,
   primary key (SIFRA_POSTAJA)
);

/*==============================================================*/
/* Table: UPORABNIK                                             */
/*==============================================================*/
create table UPORABNIK
(
   TOKEN                varchar(50) not null,
   GE_DOLZINA_U         float(13) not null,
   GE_SIRINA_U          float(13) not null,
   primary key (TOKEN)
);

alter table JE_V_BLIZINI add constraint FK_JE_V_BLIZINI foreign key (TOKEN)
      references UPORABNIK (TOKEN) on delete cascade on update cascade;

alter table JE_V_BLIZINI add constraint FK_JE_V_BLIZINI2 foreign key (SIFRA_POSTAJA)
      references POSTAJA (SIFRA_POSTAJA) on delete cascade on update cascade;

alter table MERITEV add constraint FK_VSEBUJE foreign key (SIFRA_POSTAJA)
      references POSTAJA (SIFRA_POSTAJA) on delete cascade on update cascade;

