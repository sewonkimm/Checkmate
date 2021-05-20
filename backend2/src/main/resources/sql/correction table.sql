# create table
CREATE TABLE `correction` (
    `correction_id` int(11) NOT NULL AUTO_INCREMENT,
    `correction_before` varchar(255) NOT NULL,
    `correction_after` varchar(255) NOT NULL,
    `correction_category` int(11) DEFAULT 0,
    PRIMARY KEY (`correction_id`),
    UNIQUE KEY `correction_id_UNIQUE` (`correction_id`)
);

# insert data
insert into correction
	values ("되고 있는 것 같다", "된다", 1);

insert into correction
	values ("생각된다", "생각한다", 2);

insert into correction
	values ("되어지고 있다", "된다", 2);

insert into correction
	values ("보여진다", "보인다", 2);

insert into correction
	values ("로 측정되었다", "이었다", 2);

insert into correction
	values ("발견되었다", "있었다", 2);

insert into correction
	values ("법론", "법", 3);

insert into correction
	values ("학적으로", "적으로", 3);

insert into correction
	values ("는 것으로 보인다", "다", 4);

insert into correction
	values ("데 있어서", "데", 5);

insert into correction
	values ("과의", "과", 5);

insert into correction
	values ("와의", "와", 5);

insert into correction
	values ("로의", "로", 5);

insert into correction
	values ("부터의", "부터", 5);

insert into correction
	values ("되었었다", "되었다", 6);

insert into correction
	values ("되어져 왔다", "되었다", 6);

insert into correction
	values ("았었다", "았다", 6);

insert into correction
	values ("했었더라면", "했더라면", 6);

insert into correction
	values ("을 갖는다", "이 있다", 6);

insert into correction
	values ("를 갖는다", "가 있다", 6);

insert into correction
	values ("혹은", "또는", 7);

insert into correction
	values ("증가할", "늘어날", 7);

insert into correction
	values ("이외에도", "이밖에도", 7);

insert into correction
	values ("유발시키다", "일으키다", 7);

insert into correction
	values ("우월하다", "낫다", 7);

insert into correction
	values ("열등하다", "못하다", 7);

insert into correction
	values ("촉지된다", "만져진다", 7);

insert into correction
	values ("시행하다", "하다", 7);
