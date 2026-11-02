-- 1. Users Table (Default 1 credit solves the cold-start problem)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN')),
    credit_balance INT NOT NULL DEFAULT 1 CHECK (credit_balance >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Skills Offered Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    tutor_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Tutoring Sessions Table
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    skill_id INT NOT NULL REFERENCES skills(id),
    learner_id INT NOT NULL REFERENCES users(id),
    tutor_id INT NOT NULL REFERENCES users(id),
    scheduled_at TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELED', 'DISPUTED')),
    learner_confirmed BOOLEAN DEFAULT FALSE,
    tutor_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Time Credit Ledger (Tracks Escrow, Transfers, Refunds, and Disputes)
CREATE TABLE credit_transactions (
    id SERIAL PRIMARY KEY,
    session_id INT UNIQUE NOT NULL REFERENCES sessions(id),
    from_user_id INT NOT NULL REFERENCES users(id),
    to_user_id INT NOT NULL REFERENCES users(id),
    amount INT NOT NULL DEFAULT 1,
    status VARCHAR(20) DEFAULT 'ESCROW'
        CHECK (status IN ('ESCROW', 'TRANSFERRED', 'REFUNDED', 'FROZEN')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Session Chat Messages (Used for coordination & Admin dispute review)
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    session_id INT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    sender_id INT NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
