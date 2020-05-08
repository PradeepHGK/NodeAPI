delete from category where category_id = 6;
select * from disease where id = 3;
Update disease set name= "Brain Cancer" where id = 6;
select * from disease;
alter table disease modify column id INT auto_increment;
insert into disease (diseases, created_at) values("Prostat Cancer", "2020-09-21");
delete from disease where id = 13;