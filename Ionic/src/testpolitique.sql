CREATE TABLE "TOPICS"
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    thematic_id INTEGER NOT NULL
);
INSERT INTO `TOPICS` VALUES (1,'Temps de travail',1);
INSERT INTO `TOPICS` VALUES (2,'Retraites',1);
INSERT INTO `TOPICS` VALUES (3,'Règles du chômage',1);
INSERT INTO `TOPICS` VALUES (4,'Licenciements',1);
INSERT INTO `TOPICS` VALUES (5,'OTAN',2);
CREATE TABLE "THEMATICS" (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT NOT NULL
);
INSERT INTO `THEMATICS` VALUES (1,'Chômage et retraites');
INSERT INTO `THEMATICS` VALUES (2,'Politique internationale, conflits à l''étranger');
INSERT INTO `THEMATICS` VALUES (3,'Handicap');
INSERT INTO `THEMATICS` VALUES (4,'Environnement, climat');
INSERT INTO `THEMATICS` VALUES (5,'Sécurité, justice, prisons');
CREATE TABLE QUESTIONS_CANDIDATES
(
    question_id INTEGER,
    candidate_id INTEGER,
    CONSTRAINT QUESTIONS_CANDIDATES_question_id_candidate_id_pk PRIMARY KEY (question_id, candidate_id)
);
CREATE TABLE "QUESTIONS"
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    thematic_id INTEGER NOT NULL,
    topic_id INTEGER NOT NULL
);
INSERT INTO `QUESTIONS` VALUES (1,'Réduire le temps de travail',1,1);
INSERT INTO `QUESTIONS` VALUES (2,'Maintenir les 35 heures',1,1);
INSERT INTO `QUESTIONS` VALUES (3,'Temps de travail négociable par branche',1,1);
INSERT INTO `QUESTIONS` VALUES (4,'Allonger la durée de cotisations',1,2);
INSERT INTO `QUESTIONS` VALUES (5,'Retraite à 60 ans avec 40 annuités',1,2);
INSERT INTO `QUESTIONS` VALUES (6,'Maintenir la durée et l''âge légal actuels',1,2);
INSERT INTO `QUESTIONS` VALUES (7,'Sortir de l''OTAN',2,1);
INSERT INTO `QUESTIONS` VALUES (8,'Sortir du commandement intégré de l''OTAN',2,1);
INSERT INTO `QUESTIONS` VALUES (9,'Renforcer l''OTAN',2,1);
CREATE TABLE "CANDIDATES" (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT NOT NULL,
	`party`	TEXT NOT NULL,
	`party_long`	TEXT NOT NULL
);
INSERT INTO `CANDIDATES` VALUES (1,'Nicolas Dupont-Aignan','DLF','Debout la France');
INSERT INTO `CANDIDATES` VALUES (2,'Marine Le Pen','FN','Front National');
INSERT INTO `CANDIDATES` VALUES (3,'Emmanuel Macron','EM','En Marche');
INSERT INTO `CANDIDATES` VALUES (4,'Benoît Hamon','PS','Parti Socialiste');
INSERT INTO `CANDIDATES` VALUES (5,'Nathalie Arthaud','LO','Lutte Ouvrière');
INSERT INTO `CANDIDATES` VALUES (6,'Philippe Poutou','NPA','Nouveau Parti Anticapitaliste');
INSERT INTO `CANDIDATES` VALUES (7,'Jacques Cheminade','S&P','Solidarité & Progrès');
INSERT INTO `CANDIDATES` VALUES (8,'Jean Lassalle','Résistons !','Résistons !');
INSERT INTO `CANDIDATES` VALUES (9,'Jean-Luc Mélenchon','FI','La France Insoumise');
INSERT INTO `CANDIDATES` VALUES (10,'François Asselineau','UPR','Union Populaire Républicaine');
INSERT INTO `CANDIDATES` VALUES (11,'François Fillon','LR','Les Républicains');
CREATE TABLE ANSWERS
(
    question_id INTEGER PRIMARY KEY,
    answer_value INTEGER NOT NULL
);
