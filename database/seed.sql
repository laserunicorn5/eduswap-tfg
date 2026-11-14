-- Seed Users (1 Admin + 3 Students with 1-2 Time Credits)
INSERT INTO users (email, full_name, role, credit_balance) VALUES
('admin@uoc.edu', 'Dr. Hector Florido', 'ADMIN', 10),
('lneto@uoc.edu', 'Lucas Neto Ferreira', 'STUDENT', 2),
('marta.g@uoc.edu', 'Marta Garcia', 'STUDENT', 1),
('alex.r@uoc.edu', 'Alex Rodriguez', 'STUDENT', 1);

-- Seed Skills Offered
INSERT INTO skills (tutor_id, title, category, description) VALUES
(3, 'Python & Data Science', 'Programming', 'Pandas, NumPy, and data visualization help for university coursework.'),
(4, 'Acoustic Guitar Basics', 'Arts', 'Learn chords, strumming patterns, and your first songs from scratch.'),
(3, 'Calculus II & Linear Algebra', 'Mathematics', 'Integrals, matrices, and exam prep with step-by-step exercises.'),
(4, 'Academic English Writing', 'Languages', 'Proofreading and structuring essays, reports, and TFG abstracts.');
