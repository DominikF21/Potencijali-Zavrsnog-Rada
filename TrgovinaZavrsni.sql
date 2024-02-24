use master;
go

drop database if exists trgovina;

create database trgovina;
go


alter database trgovina collate Croatian_CI_AS;


use trgovina;


create table korisnici(
	sifra int not null primary key identity(1,1),
	korisnickoIme varchar(50) not null,
	lozinka varchar(100) not null
);


create table proizvodi(
	sifra int not null primary key identity(1,1),
	naziv varchar(50) not null,
	cijena decimal(18,2),
);


create table djelatnice(
	sifra int not null primary key identity(1,1),
	ime varchar(50) not null,
	prezime varchar(50) not null
);


create table racuni(
	djelatnica int not null,
	korisnik int,
	datum datetime,
	brojracuna varchar(50) not null primary key,
	stavka int,
	FOREIGN KEY (djelatnica) REFERENCES djelatnice(sifra),
    FOREIGN KEY (korisnik) REFERENCES korisnici(sifra)
);


create table stavke(
	proizvod int,
	racun varchar(50),
	kolicina int,
	PRIMARY KEY (proizvod, racun),
    FOREIGN KEY (proizvod) REFERENCES proizvodi(sifra),
    FOREIGN KEY (racun) REFERENCES racuni(brojracuna)
);




--inserti
insert into korisnici (korisnickoIme, lozinka) values
	('Petra', '$argon2i$v=19$m=16,t=2,p=1$cWlvZXBmamFzZGY$c4CrZ4rK2Z/HkL54UebcBQ'),
	('Dominik', '$argon2i$v=19$m=16,t=2,p=1$cWlvZXBmamFzZGY$oynNXzgp1Ol622112mnxPQ'),
	('Natalija', '$argon2i$v=19$m=16,t=2,p=1$cWlvZXBmamFzZGY$Q7udDkWcbbkVwwS+k5cmTw'),
	('Miroslav', '$argon2i$v=19$m=16,t=2,p=1$cWlvZXBmamFzZGY$bOhCJ2/SXsZQZx5VCJ99fQ'),
	('Filip', '$argon2i$v=19$m=16,t=2,p=1$cWlvZXBmamFzZGY$eS2jaBG0YfZnLZ9cwr3LqQ');

insert into proizvodi (naziv, cijena) values
	('Kukuruzno brašno','1.29'),
	('Tapioka brašno','4.89'),
	('Mix B - Bread-Mix','6.29'),
	('Bijeli kruh - Pan Blanco','2.32');

insert into djelatnice (ime, prezime) values
	('Dražimir', 'Šnajder'),
	('Salih', 'Tripović'),
	('Svjetlana', 'Lipošćak');