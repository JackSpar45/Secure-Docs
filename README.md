## Login Credentials

```
1) Email ID: user10@gmail.com
   password: user10
```
```
2) Email ID: user20@gmail.com
   password: user20
```



# Secure Docs: A Decentralized File Encryption and Sharing Platform

Check out the documentation [here](https://drive.google.com/file/d/1SYXkmCM2-E9tnbZtgx36oImX0KgbjzZZ/view?usp=drive_link)

Secure Docs is an innovative web application designed to provide a secure, decentralized platform for file encryption, storage, and sharing. Built as a minimum viable product (MVP) for a hackathon, it tackles real-world challenges in data privacy and security by leveraging cutting-edge technologies like IPFS, blockchain, and AES encryption. Secure Docs stands out as a practical, user-friendly solution that redefines how individuals and organizations manage sensitive digital assets.

## Problem Statement
In today’s digital age, data breaches, centralized storage vulnerabilities, and lack of transparency plague traditional file management systems. Centralized cloud services are prone to hacks, single points of failure, and unauthorized access, while users often lack control over who accesses their files or proof of when changes occur. Existing solutions either compromise on security, scalability, or usability, leaving a gap for a system that:
- Protects files from interception or unauthorized access.
- Ensures data remains available and resilient without relying on a single provider.
- Provides verifiable proof of access and modifications.
- Balances advanced security with an intuitive user experience.

These issues are critical for individuals sharing personal documents, businesses handling contracts, or professionals managing confidential records—yet no single platform seamlessly addresses all these pain points.

## Our Solution
Secure Docs bridges this gap by offering a decentralized, secure, and transparent file management platform. It empowers users to encrypt files locally, store them on IPFS, and track access via the Ethereum blockchain, all within an accessible web interface. Key highlights of the solution include:

- **End-to-End Security**: Files are encrypted with AES before leaving the user’s device, ensuring only authorized parties with decryption keys can access them.
- **Decentralized Resilience**: IPFS distributes encrypted files across nodes, eliminating reliance on centralized servers and enhancing scalability.
- **Immutable Transparency**: Blockchain-stored audit trails provide tamper-proof records of file activity.
- **User-Centric Design**: A straightforward dashboard simplifies file uploads, decryption, sharing, and log tracking.

This MVP demonstrates innovation through its fusion of decentralized tech and cryptography, practicality via its real-world applicability, usability with its clean interface, and impact by addressing pressing security needs.

## Main Features
- **Data Encryption**: Files are encrypted client-side using AES before upload or sharing, ensuring privacy even if data is intercepted.
- **Decentralized Storage**: IPFS (via Pinata) splits and stores encrypted files across multiple nodes, offering scalability and redundancy.
- **Audit Trails**: File hashes and access logs are recorded immutably on Ethereum, enabling transparency and accountability.
- **Secure Authentication**: secures user logins.
- **Incentivized Storage**: Leverages decentralized storage incentives for cost efficiency and growth potential.

## Technical Workflow
- **Registration and Login**: Users sign up or log in via the homepage. Credentials (email and hashed password via bcrypt) are stored in MongoDB. Google reCAPTCHA prevents bots and DoS attacks.
- **File Upload**: From the dashboard, users upload files, which are AES-encrypted locally, sent to IPFS via Pinata, and hashed on Ethereum.
- **Decryption and Download**: Users retrieve and decrypt files from IPFS using their keys, downloading them locally.
- **Sharing**: Files are shared securely with other registered users within the platform.
- **Audit Logs**: Login times and file actions are logged and viewable, backed by blockchain records.

## Technologies Used
- **Frontend**: HTML, Tailwind CSS, React.js for a responsive, intuitive interface.
- **Backend**: Node.js — powers the server, API endpoints, and authentication.
- **Database**: MongoDB — stores user credentials securely with bcrypt-hashed passwords.
- **Encryption**: AES — ensures client-side file security.
- **Decentralized Storage**: IPFS (via Pinata) — provides scalable, distributed file hosting.
- **Blockchain**: Ethereum — records IPFS hashes and audit trails immutably.
- **Security**: Google reCAPTCHA — prevents bot attacks;
- **Libraries**: bcrypt (password hashing), Pinata SDK (IPFS uploads).

## Challenges Faced During Development
- **IPFS Integration**
  - Challenge: Uploading files to IPFS and ensuring persistence was tricky due to node availability and Pinata setup.
  - Solution: Used Pinata’s pinning service to guarantee file availability and streamlined the upload process with their SDK.

- **Blockchain Latency**
  - Challenge: Ethereum transaction times slowed down hash storage, impacting user experience.
  - Solution: Cached hashes locally in MongoDB while awaiting blockchain confirmation, displaying a “pending” status to users.

- **Encryption Key Management**
  - Challenge: Securely managing AES keys without compromising usability was complex.
  - Solution: Keys are generated client-side and stored locally, with sharing handled via encrypted in-platform messages.

- **Time Constraints**
  - Challenge: Building a fully functional MVP within the hackathon window required rapid prioritization.
  - Solution: Focused on core features (encryption, IPFS storage, basic sharing) and deferred advanced MFA options for post-hackathon polish.

- **User Interface**
  - Challenge: Balancing technical complexity with a simple UI was tough under time pressure.
  - Solution: Designed a minimal dashboard with clear buttons and tooltips, tested with quick user feedback loops.

## Hackathon Alignment
- **Innovation**: Combines AES encryption, IPFS, and Ethereum in a novel way to solve data security challenges.
- **Practicality**: Addresses real-world needs for secure file management in personal and professional contexts.
- **Usability**: Offers an intuitive flow—sign up, upload, share, and track—with minimal learning curve.
- **Impact**: Enhances privacy and trust in digital file handling, potentially transforming industries like legal, healthcare, or finance.

## User Experience
- **Sign Up/Login**: Quick, secure, and bot-proof with reCAPTCHA.
- **Dashboard**: Clean layout for profile info, file actions, and logs.
- **File Operations**: Seamless encryption, upload, decryption, and sharing.
- **Transparency**: Blockchain-backed logs instill confidence.

## Future Potential
- Lower-cost blockchain alternatives (e.g., Polygon).
- Enhanced MFA (hardware tokens, biometrics).
- Time-limited or group-based sharing options.
- A marketplace for incentivized storage providers.

## Conclusion
Secure Docs is a bold step toward secure, decentralized file management. Born from a hackathon’s creative challenge, it showcases technical prowess and out-of-the-box thinking—delivering a functional MVP that’s innovative, practical, and impactful. It’s not just a tool; it’s a vision for a safer digital future.
