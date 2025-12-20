---
title: "Chapter 17: Artificial Intelligence"
description: "ICRC Handbook on Data Protection in Humanitarian Action - Artificial Intelligence"
weight: 21
---

CHAPTER 17 ARTIFICIAL INTELLIGENCE Alessandro Mantelero use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of 

### 17.1 INTRODUCTION

 1 This chapter explores the data protection challenges associated with the use of Arti fi cial Intelligence systems in the humanitarian sector.

The most relevant are some key elements of data Processing (such as the use of large data sets) and the purpose of such Processing, particularly as it concerns decision-making processes.

The sections that follow fi rst give a basic explanation of the technology in question, then identify the related data protection challenges and provide guidance for Humanitarian Organizations on how to address some of them. 

### 17.1.1 WHAT ARTIFICIAL INTELLIGENCE IS AND HOW IT WORKS While there is no

 single, universally accepted de fi nition of the term, Arti fi cial Intelligence is generally understood as “ [a] set of sciences, theories, and techniques whose purpose is to reproduce by a machine the cognitive abilities of a human being ” . 2 In its current form, it aims to allow technology developers “ to entrust a machine with complex tasks previously delegated to a human ” . 3 Within the context of Arti fi cial Intelligence, Machine Learning (ML) is one of the most relevant processes concerning the use of Personal Data in decision-making processes.

This is a speci fi c form of Arti fi cial Intelligence de fi ned as a set of algo- rithms that get better at completing a certain task over time, with input in the form of machine-readable data. 4 An ML algorithm receives more and more data representing the problem it is trying to solve and “ learns ” from such data.

There are, however, other Arti fi cial Intelligence techniques that are less reliant on data because they “ learn ” in different ways, 5 but, in recent years, Machine Learning has attracted the vast majority of Arti fi cial Intelligence investment and is therefore the main reference for the considerations expressed in this chapter.

All forms of Arti fi cial Intelligence share a common feature: they are not a set of instructions for a machine to complete a particular task, but rather a set of instruc- tions for the machine to generate strategies or solutions to complete that task.

There are different Arti fi cial Intelligence techniques in existence, but for those relying on ML, it is possible to outline some common key elements as follows: 1 This chapter builds on and revises two previous chapters of the second edition of this Handbook, on Big Data and AI respectively.

The substance of these chapters was developed from a seminar developed with the contribution of the author during the Workshop on Arti fi cial Intelligence/Machine Learning and Data Protection in Humanitarian Action, organised by VUB-Brussels Privacy Hub and the International Committee of the Red Cross in 2019. 2 Council of Europe (CoE), “ Glossary on Arti fi cial Intelligence ” . 3 Ibid. 4 Tom M.

Mitchell, Machine Learning , McGraw-Hill Series in Computer Science, McGraw-Hill, New York, 1997, 2. 5 Examples of these methods include Bayesian networks and rule-based engines.

These methods, however, are not addressed in this chapter. 290 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of 1.

Selected data sets relating to a certain fi eld of investigation (e.g. human images for recognition or classi fi cation of persons) are presented to the system expecting that they contain speci fi c patterns or similarities (training data). 2.

Arti fi cial Intelligence identi fi es these patterns by classifying/aggregating data according to relevant features present in the training data set. 3.

This process generates a model that is able to recognize a pattern when new data are processed by it; these patterns support predictions or classi fi cations related to the used data (e.g. mobile geolocated data to detect groups ’ mobility patterns). 6 To understand the use cases of Arti fi cial Intelligence, it is important to distinguish between three possible approaches to ML: • Supervised learning : Training data are labelled by assigning a “ class ” to each piece of training data.

For instance, images of animals are tagged with labels such as “ dog ” , “ cat ” or “ parrot ” and fed into the system.

Typically, the ultimate objective will be for the algorithm to be able to classify new (previously unseen) images into one of the learned classes.

This type of learning can also be used, for example, to predict a value based on different parameters (or features), such as valuing a house based on the number of rooms, size and/or year of construction.

In both cases, the objective is for the model to properly separate the data into their correct classes or evaluate correct values.

In this process, data labelling is a crucial stage and requires fi eld experts to identify key relevant elements, based on the data set and purpose of the analysis. • Unsupervised learning: No labels are fed into the system, and Arti fi cial Intelligence groups data based on similarities or patterns that it detects autono- mously in the training data set.

In this case, the classi fi cation is made by Arti fi cial Intelligence during the learning process and no additional classes than those created by the ML process are possible. • Reinforcement learning: This approach requires little training data.

Instead, it relies on a method of reward and punishment, whereby “ the system is given a ‘ reward ’ signal for when it accomplishes what the designer wants, or a step that advances the process toward the outcome the designer described.

When the system does something wrong (fails to ef fi ciently advance toward the desired outcome), it is simply not rewarded. ” 7 Based on one of the methods described above, 8 it is possible to create static and dynamic models.

Static models do not change over time and continue to apply the 6 The Norwegian Data Protection Authority, Arti fi cial Intelligence and Privacy , The Norwegian Data Protection Authority, Oslo, January 2018, 7: www.datatilsynet.no/globalassets/global/english/ai-and-privacy.pdf. 7 Ibid., 18. 8 This chapter does not address all possible Arti fi cial Intelligence learning methods.

For more information on methods not mentioned here (such as neural networks), see e.g.: Larry Hardesty, “ Explained: Neural Networks ” , MIT News | Massachusetts Institute of Technology (blog), 14 April 2017: https://news.mit.edu/2017/explained-neural-networks-deep-learning-0414; Future of Privacy Forum, The Privacy Expert ’ s Guide to Arti fi cial Intelligence and Machine Learning , Future of Privacy Forum, Washington, DC, October 2018: https://fpf.org/wp-content/uploads/2018/10/FPF_Arti fi cial-Intelligence_Digital.pdf. 17 ARTIFICIAL INTELLIGENCE 291 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of model developed using the training data set.

They give the developer better control over the model but prevent the adopted solution from improving over time.

Dynamic models, on the other hand, are characterized by a kind of continuous learning, as they can use fresh data for improvements and changes (e.g. spam fi lter systems).

This reduces control over the model development and may lead to unforeseen critical consequences in its outputs and expected behaviour. 9 By nature, most of these Arti fi cial Intelligence techniques rely on large-scale data sets, which are the main reason for their application and an inherent component of their functioning.

Finding common patterns in a large amount of data – such as, for example, those produced at the national level on migration – might be hard for human experts.

At the same time, the computer, statistical and mathematical tools used by Arti fi cial Intelligence systems only work properly when applied to large data set minimizing outliers and other “ noise ” or disturbances.

Against this technology background, the progressive data fi cation of our society, due to the increasing availability of data produced by a variety of sources and the decreasing of the costs of sensors, IT devices/services and computing power, has made it possible to use Arti fi cial Intelligence and to analyse large-scale data sets in all the fi elds of human activity, including Humanitarian Action. 10 A shift in the approach to social analysis followed the advent of so-called big data and Arti fi cial Intelligence- based Data Analytics at the beginning of the new millennium.

For the fi rst time it was possible to combine very large volumes of diversely sourced information and analyse them, using mathematical algorithms at large scale or sophisticated computer-based tools (e.g. neural networks) to extract further information and make informed decisions.

However, this use of Arti fi cial Intelligence for social analysis raises several questions and the risk of “ algorithmic illusions ” . 11 Likewise, the way data collection is carried out, the design of the Arti fi cial Intelligence model, the training data set used, and all potential errors or biases in this process, have an in fl uence on the representation of human activities, relationships and pro fi les we use in Arti fi cial Intelligence- supported Humanitarian Action tools. 9 See e.g. the Microsoft Tay chatbot case: James Vincent, “ Twitter Taught Microsoft ’ s AI Chatbot to Be a Racist Asshole in Less than a Day ” , The Verge, 24 March 2016: www.theverge.com/2016/3/24/ 11297050/tay-microsoft-chatbot-racist. 10 See also United Nations Of fi ce for the Coordination of Humanitarian Affairs (OCHA), Humanitarianism in the Age of Cyber-Warfare .

OCHA Policy and Studies series, 2014: www.unocha.org/publications/ report/world/humanitarianism-age-cyber-warfare-towards-principled-and-secure-use-information. 11 See also, on the use of Data Analytics in society, Alessandro Mantelero, “ Personal data for decisional purposes in the age of analytics: From an individual to a collective dimension of data protection ” , Computer Law & Security Review , Vol. 32, No. 2, 1 April 2016, pp. 238 – 255: www.sciencedirect.com/science/article/abs/pii/S0267364916300280?via%3Dihub. 292 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Although the term “ Arti fi cial Intelligence ” suggests that natural intelligence and arti fi cial intelligence are similar, this is not the case.

Arti fi cial Intelligence is nothing more than a data-driven and mathematical form of information Processing; it is not able to think, elaborate concepts or develop theories of causality.

Arti fi cial Intelligence merely takes a path recognition approach to sort through very large amounts of data and infer new information and correlations.

Data dependence and path dependence are therefore both the strength and the weakness of these systems, as well as the fact that AI-based solutions are designed to be applied serially and poor design therefore affects numerous people in the same or similar circumstances.

Finally, given the use of incredibly large data sets and complex Arti fi cial Intelligence systems, the safeguarding role over decision making provided by human supervision may be very challenging and time-consuming, if not impossible in some cases.

In terms of its fi eld-speci fi c application, Arti fi cial Intelligence and large data sets may be used for objectives such as identifying potential threats relevant to Humanitarian Action, enhancing preparedness, identifying individuals or categories of individuals in need, or predicting possible patterns of evolution of contagious diseases, con fl icts, tensions and natural disasters.

Data-driven technologies can signi fi cantly enhance the effectiveness of work carried out by Humanitarian Organizations, including mapping or identi fi cation of: • patterns of events in Humanitarian Emergencies involving protected people in con fl icts or other situations of violence; • the spread of diseases or natural disasters, thus predicting possible developments and preparing to prevent damage; • the epicentre of a crisis; • safe routes; • individual humanitarian incidents; • vulnerable individuals or communities who are likely to require humanitarian response; • matches in case of separated families in Humanitarian Emergencies.

Two broad categories of applications for the use of Arti fi cial Intelligence-based solutions in Humanitarian Action can be identi fi ed: (i) applications that recognize general patterns and predict trends; (ii) applications aimed at identifying individuals or groups of individuals of rele- vance for Humanitarian Action.

In this context, the massive collection of data and the use of data-intensive applica- tions based on personal information entails several risks.

Not only might it lead to misleading and inaccurate results or decisions, but moreover the lack of accurate data protection-oriented design could lead to the development of invasive or dispro- portionate Arti fi cial Intelligence systems, as well as the adoption of solutions affected 17 ARTIFICIAL INTELLIGENCE 293 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of by signi fi cant weaknesses that make it possible to reidentify individuals in poorly anonymized data sets, Data Breaches and other cybersecurity attacks. 12 

### 17.1.2 ARTIFICIAL INTELLIGENCE IN THE HUMANITARIAN SECTOR Recent growth in available data and Processing power has greatly increased the number of Arti fi cial Intelligence applications in everyday

 life: from virtual digital assistants to biometric recognition systems to unlock devices or allow access to buildings, from traf fi c management in smart cities to content moderation for online platforms, and in many other functionalities of online and of fl ine products and services.

Arti fi cial Intelligence can also be applied to a wide variety of tasks tradition- ally performed by humans, such as medical diagnosis, image recognition and stock market prediction.

Regarding the application of Arti fi cial Intelligence in the humanitarian sector, its ability to collect, process and analyse large data sets and to extract inferences and predictions to inform decision-making processes turns Arti fi cial Intelligence into a valuable option to increase the ef fi ciency and effectiveness of humanitarian work.

This is evident, for example, in the use cases detailed below: • Reading public opinion.

In Uganda, the UN Global Pulse programme piloted “ a toolkit that makes public radio broadcasts machine-readable through the use of speech recognition technology and translation tools that transform radio content into text ” . 13 This tool, developed by the Pulse Lab Kampala, aims to identify trends among different population groups, particularly those in rural areas.

The rationale behind the initiative is that these trends could then provide government and development partners with a better understanding of public opinion on the country ’ s development needs, which could then be taken into consideration when implementing development programmes. • Identifying and locating missing children.

It has been reported 14 that India ’ s National Tracking System for Missing & Vulnerable Children identi fi ed nearly 3,000 missing children within four days of launching a trial of a new facial recognition system that matches the faces of missing individuals with photo- graphs of children living in children ’ s homes and orphanages. 12 Marelli, “ De fi ning the Cyber Perimeter ” , April 2020, 367. 13 Pulse Lab Kampala, “ Making Ugandan Community Radio Machine-Readable Using Speech Recognition Technology ” , UN Global Pulse (blog), 2016: www.unglobalpulse.org/project/making-ugandan- community-radio-machine-readable-using-speech-recognition-technology/. 14 Anthony Cuthbertson, “ Indian police trace 3,000 missing children in just four days using facial recognition technology ” , The Independent , 24 April 2018: www.independent.co.uk/tech/india-police- missing-children-facial-recognition-tech-trace- fi nd-reunite-a8320406.html; see also: PTI, “ Delhi: facial recognition system helps trace 3,000 missing children in 4 days ” , The Times of India , 22 April 2018: https://timeso fi ndia.indiatimes.com/city/delhi/delhi-facial-recognition-system-helps-trace-3000- missing-children-in-4-days/articleshow/63870129.cms.

For the system ’ s of fi cial website, see: https:// trackthemissingchild.gov.in/trackchild/index.php/index.php. 294 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of • Tracking attacks on civilians and human rights violations.

Amnesty International ’ s Decode the Difference project 15 recruited volunteers to compare images of the same location at different time periods to identify damaged build- ings, which could potentially demonstrate systematic attacks against civilians.

In the future, the data could be used to train Machine Learning tools to analyse the images, thereby speeding up the process and increasing capacity. • Preventing and diagnosing disease. “ Since the 1990s, AI has been used to diagnose various types of diseases, such as cancer, multiple sclerosis, pancreatic disease and diabetes. ” 16 More recently, Microsoft ’ s Project Premonition was developed to detect pathogens before they cause outbreaks.

The project deploys robots that aim to monitor the presence of mosquitoes in an area, make predic- tions about their distribution and capture targeted species.

Through Machine Learning techniques, the captured mosquitoes are searched for pathogens they may carry from animals they have bitten. 17 When dealing with Arti fi cial Intelligence-based projects, concerns may also be raised when applying basic data protection principles 18 in this context.

Arti fi cial Intelligence-based pro fi ling and hidden nudging practices challenge the idea of freedom of choice based on the notion of Data Subjects ’ control over their infor- mation, and the widespread complexity and obscurity of Arti fi cial Intelligence algo- rithms hamper the chances of obtaining real informed Consent and transparency requirements.

Similar challenges relate to another key principle, data minimization, as big data and Machine Learning Arti fi cial Intelligence algorithms rely on large amounts of data to produce useful results. 19 15 Amnesty International, “ Amnesty Decoders | Join Decode Surveillance NYC ” , Amnesty International, accessed 17 March 2022: https://decoders.amnesty.org. 16 Heather M.

Roff, “ Advancing Human Security through Arti fi cial Intelligence ” , Chatham House – International Affairs Think Tank, 11 May 2017, 5: www.chathamhouse.org/2017/05/advancing- human-security-through-arti fi cial-intelligence. 17 Microsoft, “ Microsoft Premonition ” , Microsoft Research (blog), accessed 21 March 2022: www.microsoft.com/en-us/research/product/microsoft-premonition/. 18 See Chapter 2: Basic principles of data protection. 19 See Council of Europe (CoE), Guidelines on Arti fi cial Intelligence and data protection | T-PD(2019)01 , Guideline (Strasbourg: Consultative Committee of the Convention for the Protection of Individuals with regard to Automatic Processing of Personal Data (Convention 108), 25 January 2019): rm.coe.int/guidelines-on-arti fi cial-intelligence-and-data-protection/168091f9d8; Council of Europe (CoE), Guidelines on the protection of individuals with regard to the processing of personal data in a world of Big Data | T-PD(2017)01 (Strasbourg: Consultative Committee of the Convention for the Protection of Individuals with regard to Automatic Processing of Personal Data (Convention 108), 23 January 2017): rm.coe.int/CoERMPublicCommonSearchServices/DisplayDCTMContent?documentId= 09000016806ebe7a.

See also Alessandro Mantelero, Beyond Data Human Rights, Ethical and Social Impact Assessment in AI , 1st ed., Information Technology and Law Series, Springer, The Hague, 2022), chap. 1. 17 ARTIFICIAL INTELLIGENCE 295 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Before considering the speci fi c issues related to Arti fi cial Intelligence and large-scale data Processing, several speci fi cities relating to data protection should be highlighted at the outset of this analysis: • Data sources.

First of all, it is important to identify the source of data.

Much Arti fi cial Intelligence-based data Processing undertaken by Humanitarian Organizations is based on publicly available data, such as information from government agencies or public records, social media networks, census data and other publicly available demographic and population surveys.

In other cases, Humanitarian Organizations may partner with private enterprises such as telecommunications or infrastructure companies, Internet services, health-care providers or other commercial organiza- tions to improve the humanitarian and disaster response. • Emergency response.

The outputs from Arti fi cial Intelligence-ased data Processing can provide important bene fi ts to Humanitarian Organizations.

However, they may not always be used for an ongoing emergency or to address the vital interests of the people concerned: the exceptional, “ outlier ” circum- stances where Humanitarian Organizations operate may become a limitation in predictive Machine Learning algorithms.

Historical data sets and models in data- driven analyses, developed outside emergencies might fi nd themselves scarcely able to cope due to outliers created in the extremely changeable circumstances of emergencies.

Thus, it is important to consider Arti fi cial Intelligence derived uniquely from Humanitarian Data since these models would integrate information learned during an emergency to support administrative work or to contribute to strategies to improve the response to future emergencies. • Accuracy.

Given the data-driven nature of Arti fi cial Intelligence, the quality of the data used to train it signi fi cantly impacts both the development of the models and their performance.

Here it is therefore crucial to verify that data used for training and running the Arti fi cial Intelligence models are representative and accurate and do not contain any bias. 20 • Automated decisions.

Although in emergency situations automation can facili- tate timely responses, it is important to be aware of the risks associated with a lack of human intervention and oversight, including in terms of ability to fully under- stand the complexity of the contextual background to prevent incorrect insights and decisions. • Reuse of data for other purposes.

The availability of large data sets often raises questions about the use of collected data for purposes other than those for which they were collected.

This poses questions under Data Protection laws, which 20 UN Global Pulse and Leiden University, “ Big Data for Development and Humanitarian Action: Towards Responsible Governance ” , Global Pulse Privacy Advisory Group Meetings 2015 – 2016, December 2016: www.unglobalpulse.org/document/big-data-for-development-and-humanitarian-action-towards- responsible-governance.

See also Mireille Hildebrandt, “ The issue of bias: The framing powers of machine learning ” , in Machine We Trust: Perspectives on Dependable AI , ed.

Marcello Pelillo and Teresa Scantamburlo, The MIT Press, Cambridge, MA, 2021, 44 – 59: https://dx.doi.org/10.2139/ssrn.3497597. 296 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of generally require that personal data be collected for speci fi c purposes and pro- cessed for such purposes or for compatible purposes only, and not reused for other purposes without the Consent of the person concerned or another legal basis (see Section 17.2.1 – Legal bases for Personal Data Processing). • The sensitivity of data output created by Personal Data Processing in humani- tarian situations.

It is important to understand that publicly available data, such as data on social media networks, mobility data or data generated by mobile phone connections, may generally be considered non-Sensitive Data but may generate Sensitive Data in different contests and mainly in a humanitarian situation.

This can occur when the Processing of non-Sensitive Data enables the pro fi ling of individuals that could be subjected to discrimination or repression, such as, for example, potential victims, people af fi liated with a particular group in a situation of violence, or persons suffering from a particular illness.

In these cases, speci fi c computing techniques, such as differential privacy , 21 can be a valuable way to protect individual and group privacy while allowing access to data. 22 • Anonymization.

There may be doubts about the effectiveness of Anonymization of Personal Data and the possibility of Reidenti fi cation in Arti fi cial Intelligence-based operations, regardless of whether for humanitarian or other purposes.

Again, privacy- enhancing technologies, such as synthetic data , 23 can complement Anonymization attempts to provide higher protection and prevent Reidenti fi cation. 24 • Regulatory fragmentation.

While many states have enacted data protection laws and many Humanitarian Organizations have already implemented data protection policies and guidelines, the question of how speci fi cally data and Arti fi cial Intelligence-based data Processing are regulated across borders in times of humanitarian crises remains open. 25 It is important to stress that when Arti fi cial Intelligence is used for Humanitarian Action, the implications for individuals may be much more serious than in other 21 Cynthia Dwork, “ Differential Privacy ” , in Henk C.

A. van Tilborg and Sushil Jajodia (eds), Encyclopedia of Cryptography and Security , Springer US, Boston, MA, 2011, 338 – 340: https://doi.org/10.1007/978-1- 4419-5906-5_752. 22 Data smoothing means removing noise from a data set so that important patterns stand out. 23 Synthetic data is information generated by algorithms that is not real-world data but re fl ects real-world data, mathematically or statistically.

See European Data Protection Supervisor (EDPS), “ IPEN Webinar 2021 – ‘ Synthetic Data: What Use Cases as a Privacy Enhancing Technology? ’” , EDPS, 16 June 2021: www.edps.europa.eu/data-protection/our-work/ipen/ipen-webinar-2021-synthetic- data-what-use-cases-privacy-enhancing_en. 24 Prokopios Drogkaris and Monika Adamczyk (eds.), Data Protection Engineering – From Theory to Practice , European Union Agency for Cybersecurity (ENISA), 27 January 2022: www.enisa.europa.eu/ publications/data-protection-engineering. 25 UN Global Pulse and Leiden University, Big Data for Development and Humanitarian Action , 7 – 9.

See also Júlia Zomignani Barboza, Lina Jasmontait ė -Zaniewicz and Laurence Diver, “ Aid and AI: The challenge of reconciling humanitarian principles and data protection ” , in Privacy and Identity Management.

Data for Better Living: AI and Privacy , IFIP International Summer School on Privacy and Identity Management, Springer, Cham, 2020, 161 – 176: https://doi.org/10.1007/978-3-030-42504-3_11. 17 ARTIFICIAL INTELLIGENCE 297 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of contexts.

Humanitarian Organizations should therefore consider whether any data they release or information they provide using data-intensive Arti fi cial Intelligence systems can be used, even in an aggregated form, to target the people they seek to protect.

Furthermore, information on “ invisible populations ” can be extracted indir- ectly using data on different groups related to them, with potential implications in terms of discrimination or actions against minorities, even more so in case of con fl icts.

It is important, therefore, always to keep in mind the “ big picture ” of the potential implications of using data-intensive Arti fi cial Intelligence systems in a context characterized by reduced protection systems and heightened vulnerabilities.

EXAMPLE: Authorities might use public or published fi ndings based on the extraction and analysis of tweets and other material on social media networks to locate the epicentre and fl ows of public demonstrations, and to avoid loss of human life.

However, these same fi ndings might then be used by the same authorities to identify individuals who took part in such public demonstrations (or who did not), which can have severe consequences for the identi fi ed groups of individuals.

Arti fi cial Intelligence may involve Processing scenarios such as the following: EXAMPLE 1: the extraction and analysis of public communications through social media, search engines or telecommunications services, as well as news sources.

This can help demonstrate how methods including sentiment analysis, topic classi fi cation and network analysis can be used to support public health workers and communication campaigns.

EXAMPLE 2: the development of interactive data visualization tools during a humanitarian incident.

This can help demonstrate how communications signals or satellite data could support emergency response management.

EXAMPLE 3: Analysis of messages received through a Humanitarian Organization ’ s citizen reporting platform.

EXAMPLE 4: Analysis of social media, mobile phone network metadata and credit card data to identify individuals likely to be at risk of enforced disappearance or to locate persons unaccounted for.

Focusing on the large-scale data sets potentially used by Arti fi cial Intelligence, the following may be relevant: • accessible data sets : i.e. data sets that are already publicly available, such as public records released by governments or information people have intentionally made public in the media or on the Internet, including through social media; • data sets held by Humanitarian Organizations : e.g. lists of distribution bene fi - ciaries, patients, protected individuals, individuals reporting violations of inter- national humanitarian law/human rights; 298 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of • data sets held by private Third Parties : e.g. mobile telecommunications, Internet service, banking and fi nancial providers, fi nancial transactions data, remote sensor data, whether aggregated/pseudonymized or not; • a combination or aggregation of data sets of Humanitarian Organizations, authorities and/or corporate entities (including the organizations mentioned above).

Humanitarian Organizations may play the following roles in data Processing: • process data held for the purposes of their respective organizations, in their capacity as Data Controllers or Joint Controllers (when determining the purposes and means of Processing jointly with other Humanitarian Organizations, public authorities and/or commercial entities); • employ Third Parties who process data on behalf of the organization (e.g. com- mercial entities that use Arti fi cial Intelligence for predictive analyses on the data held by the Humanitarian Organization and for the purposes of this organization) and act as Data Processors; • require commercial entities that are and remain the Data Controller to carry out analyses on data for humanitarian purposes and to provide conclusions/ fi ndings to the Humanitarian Organization.

Such conclusions may relate to aggregated/ pseudonymized data, or data identifying individuals of possible relevance to Humanitarian Action. 

### 17.1.3 CHALLENGES AND RISKS OF USING ARTIFICIAL INTELLIGENCE Despite their

 potential, Arti fi cial Intelligence applications carry challenges and risks.

Besides data protection concerns, 26 all the above-mentioned use cases also present practical implementation challenges.

For example, Arti fi cial Intelligence-based image recognition software used to identify missing people may provide too many false positives.

These false matches could not only create confusion among case workers, but also potentially give false hope to families.

Other systems could be more accurate but potentially miss positive matches (known as false negatives).

While false negatives may not be much of an issue in commercial applications, they can have important consequences in the humanitarian sector.

If an organization misiden- ti fi es a child who has lost contact with their parents, this can cause harm to the entire family.

Arti fi cial Intelligence can also pose risks to affected people.

For instance, if Arti fi cial Intelligence is used to identify the right target population for a particular humanitar- ian programme, and the solution does not make a correct identi fi cation, people who 26 See also Anne Meuwese, “ Regulating algorithmic decision-making one case at the time: A note on the Dutch ‘ SyRI ’ judgment ” , European Review of Digital Administration & Law , Vol. 1, No. 1, 2020, pp. 209 – 211. 17 ARTIFICIAL INTELLIGENCE 299 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of would otherwise be entitled to participate in the programme could be excluded.

This has happened in practice in Sweden, where thousands of unemployed people were wrongly denied bene fi ts by a government system that used Arti fi cial Intelligence. 27 Since most Humanitarian Organizations will acquire off-the-shelf solutions rather than developing their own models, there is a not-insigni fi cant risk that algorithms could deliver unexpected or unreasonable results.

This also highlights the risk of decontextualization when choosing off-the-shelf Arti fi cial Intelligence models – where models originally used for one purpose are then reused in a different context and for a different purpose 28 – or when using models trained on historical data from a different population. 29 In addition, vendor lock-in poses a risk because switching solutions may be costly.

Organizations could also be targeted by commercial ventures that are primarily interested in gaining access to and exploiting the large data sets they hold, sometimes at great risk to the individuals and communities to whom the data belong.

Bias poses another risk to the effectiveness of Arti fi cial Intelligence, especially in speci fi c humanitarian contexts where it is important to use data sets fi t for the intended goal.

As with many other technologies, the concept of “ garbage in, garbage out ” 30 also applies to Arti fi cial Intelligence, and using un fi t, inaccurate or irrelevant data may affect the accuracy of the solution.

This is particularly challenging for a Humanitarian Organization, as off-the-shelf algorithms will extremely rarely fi t their contexts.

For instance, if a Humanitarian Organization wants to develop facial recognition software to help fi nd missing people, the training data sets will need to be suf fi ciently broad to ensure that racial variations in physical features are inte- grated to maximize the precision of the matching function. 27 Tom Willis, “ Sweden: Rogue Algorithm Stops Welfare Payments for up to 70,000 Unemployed ” , AlgorithmWatch, 25 February 2019: https://algorithmwatch.org/en/rogue-algorithm-in-sweden-stops- welfare-payments. 28 See Robyn Caplan et al., “ Algorithmic Accountability: A Primer ” , Data & Society, 18 April 2018, 7: https://datasociety.net/library/algorithmic-accountability-a-primer, citing the case of the PredPol algorithm, originally designed to predict earthquakes and later used to identify crime hotspots and assign police. 29 See Council of Europe (CoE), Guidelines on Arti fi cial Intelligence and data protection | T-PD(2019)01 .

See also Council of Europe (CoE), Arti fi cial Intelligence and Data Protection: Challenges and Possible Remedies | T-PD(2018)09Rev , report on Arti fi cial Intelligence (Strasbourg: Consultative Committee of the Convention for the Protection of Individuals with regard to Automatic Processing of Personal Data (Convention 108), 25 January 2019): https://rm.coe.int/arti fi cial-intelligence-and-data-protection- challenges-and-possible-re/168091f8a6. 30 According to the free online dictionary of computing (http://foldoc.org), the concept of garbage in, garbage out relates to the fact that “ computers, unlike humans, will unquestioningly process nonsensical input data and produce nonsensical output ” .

The term is also used to refer to “ failures in human decision-making due to faulty, incomplete, or imprecise data ” . 300 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Processing Personal Data using Arti fi cial Intelligence also presents major challenges for Personal Data protection.

When Processing large data sets for purposes other than those for which they were collected, there is a risk of violating basic notions of data protection, including purpose limitation, data minimization or data retention (i.e. keeping data only as long as necessary to ful fi l the purposes of data collection). 31 In essence, large-scale data analysis thrives in open and unrestricted Processing environments while, on the other hand, Personal Data protection favours limited and well-de fi ned Processing.

Data protection thus needs to be applied in an innovative way to these technologies. 32 The fundamental principles of data protection must be respected while performing Arti fi cial Intelligence-based data Processing.

These principles include (i) fairness and lawfulness of the Processing; (ii) transparency; (iii) purpose limitation; (iv) data minimization; (v) data quality.

While some of these principles are compatible with the nature of Arti fi cial Intelligence applications, others raise questions or con fl icts. 33 Consequently, Humanitarian Organizations must be particularly careful when apply- ing them in practice. 34 

### 17.2 APPLICATION OF BASIC DATA PROTECTION PRINCIPLES Solutions that integrate or use Arti fi cial Intelligence process large amounts of data

 – both personal and non-personal – in order to function properly.

In this regard, it is crucial to consider that these applications can infer Personal Data from non-personal information or anonymized data.

This is because Arti fi cial Intelligence solutions are increasingly capable “ of linking data or recognizing patterns of data [that] may render non-personal data identi fi able ” . 35 This means that Arti fi cial Intelligence can also reidentify data provided, for example, by a variety of sensors and smart devices. 31 See Chapter 2 – Basic principles of data protection.

See also: Council of Europe (CoE), Arti fi cial Intelligence and Data Protection: Challenges and Possible Remedies | T-PD(2018)09Rev . 32 See Council of Europe (CoE), Guidelines on the protection of individuals with regard to the processing of personal data in a world of Big Data | T-PD(2017)01 ; Alessandro Mantelero, “ Regulating Big Data: The guidelines of the Council of Europe in the context of the European Data Protection Framework ” , Computer Law & Security Review , Vol. 33, No. 5, October 2017, pp. 584 – 602: www.sciencedirect.com/science/article/abs/pii/S0267364917301644?via%3Dihub; UN Global Pulse, Guidance note on Big Data for achievement of the 2030 Agenda , 19 August 2019: www.unglobalpulse .org/policy/privacy-and-data-protection-principles; European Data Protection Supervisor (EDPS), Opinion 7/2015: Meeting the Challenges of Big Data , Opinion, EDPS, Brussels, 19 November 2015, 4: www.edps.europa.eu/data-protection/our-work/publications/opinions/meeting-challenges-big-data_en. 33 See also Mantelero, Beyond Data Human Rights, Ethical and Social Impact Assessment in AI , chap. 1. 34 The discussion on data protection in this chapter builds on the principles set out in Part I and examines them in greater detail. 35 Centre for Information Policy Leadership, Arti fi cial Intelligence and Data Protection in Tension , Arti fi cial Intelligence and Data Protection: Delivering Sustainable AI Accountability in Practice, 17 ARTIFICIAL INTELLIGENCE 301 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of An assessment of the risks of Reidenti fi cation should therefore be carried out and, when possible, the Data Subject or relevant stakeholders be informed of the results of this assessment.

If there is a strong possibility of Reidenti fi cation, the analysis should not be performed, or the methodology should be adjusted.

For these reasons, the use of Anonymization as an “ exit strategy ” with respect to data protection obligations is not always effective.

Moreover, anonymous, or anonymized data may also present technical challenges as the capacity to process may be hindered during Processing.

In addition, the accuracy of Arti fi cial Intelligence outputs when Processing anon- ymized or aggregated data should be assessed.

The methods and level of Anonymization or aggregation should therefore be carefully selected to minimize not only the risks of Reidenti fi cation but also to ensure that the data maintain an adequate level of quality to achieve credible results. 

### 17.2.1 LEGAL BASES FOR PERSONAL DATA PROCESSING When carrying out Arti fi cial

 Intelligence-driven Processing operations, Humanitarian Organizations may rely on one or more of the following legal bases: 36 • the vital interest of the Data Subject or of another person; • the public interest, in particular based on an Organization ’ s mandate under national or international law; • the informed Consent of the Data Subject; • a legitimate interest of the organization; • the performance of a contract; • compliance with a legal obligation.

However, the speci fi c nature of Arti fi cial Intelligence applications and related data Processing poses some challenges to this traditional framework, mainly in the case of individual Consent to data Processing and secondary use of collected data (i.e. data originally collected for a speci fi c purpose and then reused for a different one, as is often the case in Arti fi cial Intelligence given the large-scale data sets needed).

As pointed out in literature, the effectiveness of Data Subjects ’ Consent as a legal basis has been weakened by lengthy and technical data Processing notices, social and technical lock-ins, obscure interface design, and lack of awareness on the part of the Data Subject. 37 These developments are even more relevant in the context of 10 October 2018, 11: www.informationpolicycentre.com/uploads/5/7/1/0/57104281/cipl_ai_ fi rst_ report_-_arti fi cial_intelligence_and_data_protection_in_te....pdf. 36 See Chapter 3: Legal bases for Personal Data Processing. 37 For a broader analysis and refences see Alessandro Mantelero, “ The future of consumer data protection in the E.U.

Re-thinking the ‘ notice and consent ’ paradigm in the new era of predictive analytics ” , 302 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Humanitarian Action, when Data Subjects already experience imbalances of power and other contextual needs that hamper their effective self-determination.

Moreover, Arti fi cial Intelligence-based pro fi ling and hidden nudging practices chal- lenge both the idea of freedom of choice based on contractual agreement and the notion of Data Subjects ’ control over their personal information.

Finally, the frequent complexity and obscurity of Arti fi cial Intelligence algorithms hamper the possibilities of obtaining truly informed Consent.

Legal scholars have addressed these issues by emphasizing the role of transpar- ency, 38 risk assessment 39 and more fl exible forms of Consent, such as broad Consent 40 or dynamic Consent. 41 Although none of these solutions solve the prob- lems affecting individual Consent, in certain contexts they may, whether alone or combined, reinforce self-determination.

Notwithstanding these unresolved critical issues in terms of theoretical framework and regulatory instruments, Consent can be a legitimate ground for the Processing data collected by a Humanitarian Organization, but also for the reuse of data collected by Third Parties for different purposes.

An example in this sense is the Data Analytics offered by social media networks or mobile phone operators to assist Humanitarian Organizations which could, in some cases, be based on Consent.

In such cases, the social media platform or mobile operator in question can inform Data Subjects of the intended Processing by means of a pop-up window or text message with the relevant information and provide a Consent request.

Computer Law & Security Review , Vol. 30, No. 6, 1 December 2014, pp. 643 – 660: https://doi.org/10.1016/j.clsr.2014.09.004. 38 See e.g.: Lilian Edwards and Michael Veale, “ Slave to the algorithm: Why a right to an explanation is probably not the remedy you are looking for ” , Duke Law & Technology Review , 16, 2018 2017, pp. 18 – 84; Andrew Selbst and Julia Powles, “‘ Meaningful information ’ and the right to explanation ” , International Data Privacy Law , Vol. 7, No. 4, 19 December 2017, pp. 233 – 242: doi.org/10.1093/idpl/ipx022: https://proceedings.mlr.press/v81/selbst18a.html; Sandra Wachter, Brent Mittelstadt and Luciano Floridi, “ Why a right to explanation of automated decision-making does not exist in the General Data Protection Regulation ” , International Data Privacy Law , Vol. 7, No. 2, 1 May 2017, pp. 76 – 99: https://doi.org/10.1093/idpl/ipx005. 39 See Council of Europe (CoE), Guidelines on the protection of individuals with regard to the processing of personal data in a world of Big Data | T-PD(2017)01 ; Mantelero, “ Regulating Big Data:The guidelines of the Council of Europe in the Context of the European Data Protection Framework ” ; UN Global Pulse, Guidance note on Big Data for achievement of the 2030 Agenda ; European Data Protection Supervisor (EDPS), Opinion 7/2015: Meeting the Challenges of Big Data . 40 Mark Sheehan, “ Can broad consent be informed consent? ” , Public Health Ethics , Vol. 4, No. 3, 1 November 2011, pp. 226 – 235: https://doi.org/10.1093/phe/phr020. 41 Jane Kaye et al., “ Dynamic consent: A patient interface for twenty- fi rst century research networks ” , European Journal of Human Genetics , Vol. 23, No. 2, February 2015, pp. 141 – 146: doi.org/10.1038/ejhg.2014.71. 17 ARTIFICIAL INTELLIGENCE 303 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of In order to ensure that the Data Subject receives adequate information before giving Consent, such information should include the outcome of the DPIA (if carried out) 42 and could also be provided via an interface that simulates the effects of the use of data and their potential impact on the Data Subject, in a learn-from-experience approach. 43 Data Controllers should provide Data Subjects with easy and user- friendly technical ways to withdraw their Consent and react to data Processing incompatible with the initial purposes. 44 It is important to assess the validity of Consent even when adequate information has been provided to the Data Subjects at the time of collection and the purpose of Further Processing is compatible.

This assessment should take into account the level of literacy of the Data Subject as well as the risks and harms to the Data Subjects for the Processing of their data. 45 Without the Consent of the Data Subject, Personal Data can be processed in the vital interest of the Data Subject or of another person, i.e. where data Processing is necessary in order to protect an interest essential in the life, integrity, health, dignity and safety of the Data Subject or that of another person or group of people.

Furthermore, additional legal bases, such as public interest, the legitimate interest of the organization and performance of a contract or compliance with a legal obliga- tion may also be grounds for data Processing.

Regarding the use of vital interest as a legal basis for emergency work of Humanitarian Organizations in armed con fl icts and other situations of violence, there are several cases where the Processing of data by Humanitarian Organizations is presumed to be in the vital interest of the Data Subject or another person (e.g. if data are processed in cases of Sought Persons, or if there are imminent threats against the physical and mental integrity of the persons concerned).

However, the condition of vital interest may not be met when data Processing is carried out in a non-emergency situation, for instance for administrative purposes.

Humanitarian Organizations should carefully consider the existence of important public interests, which are suf fi ciently closely linked to Arti fi cial Intelligence-based operations envisaged, to be used as a legal basis for Processing Personal Data.

The public interest could be the appropriate legal basis for data Processing where a mandate to carry out a Humanitarian Action is established in national, regional or 42 See Section 17.6: Data Protection Impact Assessment and Human Rights Impact Assessment. 43 Council of Europe (CoE), Guidelines on the protection of individuals with regard to the processing of personal data in a world of Big Data | T-PD(2017)01 . 44 Ibid. 45 UN Global Pulse, “ Tools: Risks, Harms and Bene fi ts Assessment ” , updated 2020: www.unglobalpulse .org/policy/risk-assessment. 304 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of international law and where no Consent was obtained and no emergency exists that could invoke vital interest as a legal basis.

Humanitarian Organizations should be aware that public interest as a legal basis for Personal Data Processing is not transferable, because it is speci fi c to the Organization ’ s mandate under national or international law.

The conditions (if any) under which a Third Party may undertake the data analysis, including using Arti fi cial Intelligence, on behalf of the Organization or that are applicable to International Data Sharing need to be examined separately.

Humanitarian Organizations may also process Personal Data where this is in their legitimate interest, provided that this interest is not overridden by the fundamental rights and freedoms of the Data Subject.

Such legitimate interests may include Processing necessary to make their operations more effective and ef fi cient, including facilitating logistics to enable pre-deployment of aid and staff in anticipation of Humanitarian Emergencies, where such insights could be obtained from data analy- sis.

The use of Arti fi cial Intelligence for administrative purposes may also fall under this category. 

### 17.2.2 PURPOSE LIMITATION AND FURTHER PROCESSING One of the most signi fi cant challenges in using Arti fi cial Intelligence for humanitarian purposes is that Arti fi cial Intelligence operations are very likely to be run on existing data

 sets, previously collected by the Humanitarian Organization or by Third Parties for a different purpose.

The key question is, therefore, to determine whether the envisaged analysis is compatible with the original purpose of collection.

If so, Arti fi cial Intelligence operations can be carried out under the existing legal basis.

If not, a new legal basis for Further Processing must be found.

In addition, applying the purpose limitation principle 46 to Arti fi cial Intelligence may be challenging because these technologies have the capacity to process data in ways that were not originally planned, and are used to identify new patterns and infer- ences which are, by their nature, unknown and unexpected.

EXAMPLE: In 2012, researchers found that when Arti fi cial Intelligence algorithms analysed a person ’ s Facebook “ likes ” , with no further information from that person, the solu- tions could “ automatically and accurately predict a range of highly sensitive personal attributes including: sexual orientation, ethnicity, religious and political views, 46 See Section 2.5.2 – The purpose limitation principle. 17 ARTIFICIAL INTELLIGENCE 305 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of personality traits, intelligence, happiness, use of addictive substances, parental sep- aration, age, and gender ” . 47 More speci fi cally, the solution correctly discriminated “ between homosexual and heterosexual men in 88% of cases, African Americans and Caucasian Americans in 95% of cases, and between Democrat and Republican in 85% of cases ” . 48 In this particular case, the solution was being asked to make these correlations.

Yet in other situations, Arti fi cial Intelligence solutions may draw such inferences on their own and reveal sensitive information about a person even when that was not the developer ’ s intention.

As discussed in Chapter 2: Basic principles of data protection, at the time of collecting data the Humanitarian Organization concerned must determine and set out the speci fi c purpose(s) for which data are processed.

The speci fi c purpose(s) should be explicit and legitimate and could include anything from restoring family links, to protecting individuals in detention, forensic activities or protecting water and habitat.

The purpose of any planned analytics should be speci fi ed at the outset of data collection, and when new purposes are added this must be consistent with the data protection requirements in terms of compatible purposes and legal grounds.

Arti fi cial Intelligence – in a similar way to big data 49 – represents a challenge for the application of the purpose limitation principle.

On the one hand, analytics make it hard to identify the speci fi c purpose of data Processing at the time of data collection and, on the other hand, Machine Learning algorithms (whose purposes are necessar- ily speci fi ed) may not anticipate and explain how these purposes are to be achieved.

In both cases therefore transparency on the purpose and methods of data Processing may remain limited.

In addition, the purpose limitation principle should also be considered with regard to the data sets used and potential unwanted outcomes.

If it is foreseen that the solution may process Personal Data in ways that are incompatible with the de fi ned purpose or that it will reveal information or make predictions that are not desired, these factors should be taken into account when choosing the training data set and developing the model.

In these large-scale data-intensive applications, it is common to carry out Processing operations that require the data to be processed for purposes other than those for which they were initially collected.

In this case of secondary use of data, 47 Michal Kosinski, David Stillwell and Thore Graepel, “ Private traits and attributes are predictable from digital records of human behavior ” , Proceedings of the National Academy of Sciences , Vol. 110, No. 15, 11 March 2013, p. 1: https://doi.org/10.1073/pnas.1218772110. 48 Ibid. 49 See also The Norwegian Data Protection Authority, Arti fi cial Intelligence and Privacy . 306 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Humanitarian Organizations may therefore assess whether Further Processing is compatible with the purposes initially speci fi ed at the time of data collection, includ- ing where the Processing is necessary for historical, statistical or scienti fi c purposes. 50 In order to establish whether these operations can be considered Further Processing that is compatible with the purpose for which the data were initially collected, attention should be given to the following factors: • any link between the purposes for which the data were collected and the purposes of the intended Further Processing; • the situation in which the Personal Data were collected and, in particular, the relationship between Data Subjects and the Data Controller, and possible expect- ations of the Data Subjects; • the nature of the Personal Data; • the possible consequences of the intended Further Processing for Data Subjects; • the existence of appropriate safeguards.

Based on these factors, it is possible that in several cases different humanitarian purposes are linked and considered compatible with each other.

Compatibility depends on the circumstances of the case and Further Processing would not be compatible if new risks arise, or if the risks for the Data Subject outweigh the bene fi ts of Further Processing.

Further Processing would also not be compatible where Processing is potentially detrimental to the interests of the Data Subject or his/her family, in particular when there is a risk that the Processing might threaten their life, integrity, dignity, psychological or physical safety, freedom or reputation.

This includes consequences such as harassment or persecution by authorities or Third Parties, judicial prosecution, social and private problems, restriction of freedom, and psychological suffering.

It should also be highlighted that some data protection regulations, such as the EU GDPR, pose restrictions to secondary uses of Personal Data but adopt speci fi c derogations for public interest purposes, which include humanitarian purposes.

In cases, where Third Party data are processed for purposes that go beyond those for which they were originally collected due to the humanitarian value in the use of the data sets, humanitarian purposes should not expose the Data Subjects to new risks or harm.

EXAMPLE 1: Data sets collected by a Humanitarian Organization while dealing with an incident, for instance in order to distribute aid, may be used at a later stage for the 50 See Subsection 2.5.2.1 – Further Processing. 17 ARTIFICIAL INTELLIGENCE 307 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of purpose of understanding patterns of displacement and pre-deploying aid in subse- quent Humanitarian Emergencies.

EXAMPLE 2: Data sets collected by a telecommunications provider in the course of providing its services to its subscribers may not be used without these subscribers ’ Consent in Data Analytics Processing by Humanitarian Organizations, if it can result in such individuals being pro fi led as potential bearers of a disease, with consequent restrictions on movement imposed by authorities.

In these cases, Humanitarian Organizations and their Third Party counterparts should consider whether mitigating measures, such as data aggregation, would be suf fi cient to remove the risk identi fi ed. 

### 17.2.3 FAIR AND LAWFUL PROCESSING As is always the case with Personal Data

 Processing, if Personal Data will be processed within the Arti fi cial Intelligence solution or as part of its training, a lawful process requires a legitimate legal basis for the Processing to take place.

Chapter 3: Legal bases for Personal Data Processing, outlines different legal grounds and points out the limitations of using Consent as a legal basis in Humanitarian Action.

Limitations to the use of Consent, in particular the possibility of withdrawing it, are also relevant to the development and improvement of Arti fi cial Intelligence solutions. 51 When a Humanitarian Organization develops an Arti fi cial Intelligence-based solu- tion, it should identify an appropriate legal basis to process Personal Data to train the algorithm to achieve a clearly de fi ned purpose.

A legal basis should also be de fi ned for the Processing of new Personal Data to ful fi l the intended objective once the system has been trained.

Lastly, the organization should also identify a legal basis for Processing data to improve the model, in the case of dynamic models.

With dynamic models, including off-the-shelf solutions developed by technology companies, it is important to remember that all data fed into the system during development and application will be used to improve it.

This may pose further challenges to the use of Consent, since bene fi ciaries might agree to having their Personal Data processed for a particular humanitarian purpose, but may not expect it to be used for the development of the Arti fi cial Intelligence solution. 52 In such cases, if the identi fi ed legal basis for Processing is Consent, the Data Subjects should be informed, in an easy-to-understand manner, of the reasons why their data are requested, what they will be used for, and how they will in fl uence the solution.

They should also be informed of potential risks, such as Reidenti fi cation by the solution or the fact that their data could be accessed during a malicious attack. 51 See also above Section 17.2.1 – Legal bases for Personal Data Processing. 52 Future of Privacy Forum, The Privacy Expert ’ s Guide to Arti fi cial Intelligence and Machine Learning , 8. 308 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of In light of the above, Consent may not always be an appropriate legal basis for the use of Arti fi cial Intelligence in the humanitarian sector.

While the delivery of aid or life-saving services may mean that vital interest 53 or public interest 54 can be con- sidered legitimate legal bases to justify the Processing of Personal Data, the develop- ment of Arti fi cial Intelligence solutions sometimes may not.

To determine whether the improvement of Arti fi cial Intelligence solutions is acceptable under the chosen legal basis, an organization should consider whether the Further Processing for the improvement of the solution is compatible with the initial purpose for which it collected the Personal Data.

The principle of fairness 55 requires that all Processing activities respect Data Subjects ’ interests, and that Data Controllers take action to prevent arbitrary discrimination against individuals. 56 The issue of discriminatory bias in Arti fi cial Intelligence is widely recognized and debated. 57 EXAMPLE: In a well-known example, an Arti fi cial Intelligence solution was developed in the United States to predict reoffending rates in criminal cases, in order to help judges decide whether or not to grant bail to convicted offenders.

The solution incorrectly rated black defendants as being almost twice as likely to reoffend as white defendants. 58 To minimize the risk of discriminatory bias, it is recommended that Arti fi cial Intelligence developers “ adopt a human rights by-design approach and avoid any potential biases, including unintentional or hidden, and the risk of discrimination or other adverse impacts on the human rights and fundamental freedoms of data subjects ” . 59 Bias in Arti fi cial Intelligence solutions may stem from the use of biased data sets as training data, from systemic biases in society, or even from developers deciding 53 See Section 3.3 – Vital interest. 54 See Section 3.4 – Important grounds of public interest. 55 See Section 2.5.1 – The principle of the fairness and lawfulness of Processing. 56 The Norwegian Data Protection Authority, Arti fi cial Intelligence and Privacy , 16. 57 Sandra Wachter, Brent Mittelstadt and Chris Russell, “ Why fairness cannot be automated: Bridging the gap between EU non-discrimination law and AI ” , Computer Law & Security Review , Vol. 41 (2021), 105567. 58 Julia Angwin et al., “ Machine Bias ” , ProPublica, 23 May 2016: www.propublica.org/article/machine- bias-risk-assessments-in-criminal-sentencing?token=p-v0T1xjfOJ8jrJHzc08UxDKSQrKgWJk. 59 Council of Europe (CoE), Arti fi cial Intelligence and Data Protection: Challenges and Possible Remedies | T-PD(2018)09Rev , 2. 17 ARTIFICIAL INTELLIGENCE 309 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of which features to assign more value to in each data set.

Moreover, when there are historical biases in society, it may be dif fi cult to fi nd unbiased data to train Arti fi cial Intelligence or it is necessary to “ clean ” or normalize the data sets or adopt alterna- tive solutions such as debiased synthetic data.

More generally, to prevent bias, a model must be trained with relevant and correct data and must also learn which features to emphasize.

Depending on the case, when there is a risk of arbitrary discrimination, information related to racial or ethnic origin, political opinion, religious and philosophical beliefs, sexual orientation or any other information that could be grounds for discrimination may not be processed or may be protected in a way that does not emphasize them leading to discrimination. 60 The training data must also be fi t for the purpose of the Arti fi cial Intelligence solution.

In other words, the selected data must be relevant to the task, and constant checks and updates will be required to identify inaccurate and/or corrupt data and remove them from the training data set.

New data may also be added to avoid bias.

It is therefore important that Humanitarian Organizations work with developers to ensure that the solution they acquire or develop is applicable or suited to the organization ’ s needs in a particular context.

The fact that Arti fi cial Intelligence models should not emphasize such categories of data does not mean, however, that suppressing them from the data set will necessar- ily eliminate the risk of bias.

The system could correlate other features such as race or gender, and the model may learn to be biased based on those correlated features, which are known in this context as “ proxies ” . 61 Moreover, since the main discrimin- atory feature has been removed from the data set, it might be more dif fi cult to detect and correct the bias.

EXAMPLE: A separate study looking at the US predictive solution discussed earlier found in almost 70 per cent of cases that the algorithm made a correct reoffending prediction despite its clear bias.

In this second study, however, race was not included in the data set, highlighting “ the challenge of fi nding a model that doesn ’ t create a proxy for race (or other eliminated factor) – such as poverty, joblessness, and social marginalization ” . 62 60 The Norwegian Data Protection Authority, Arti fi cial Intelligence and Privacy , 16. 61 Centre for Information Policy Leadership, Arti fi cial Intelligence and Data Protection in Tension , 14. 62 Future of Privacy Forum, The Privacy Expert ’ s Guide to Arti fi cial Intelligence and Machine Learning , 15. 310 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of For this reason, when choosing the training data set, an Arti fi cial Intelligence devel- oper – whether acting as an independent Data Controller, a Data Processor, or a joint Controller with a Humanitarian Organization – needs to assess the quality, nature and origin of the Personal Data used, and consider the potential risks to individuals and groups of using decontextualized data to create decontextualized models. 63 One way to achieve this is for Data Controllers to include, in the continuous DPIA process (see Section 17.2 – Application of basic data protection principles), “ frequent assess- ments on the datasets they process to check for any bias ” , and to “ develop ways to address any prejudicial elements, including any over-reliance on correlations ” . 64 Not taking such measures has both legal and ethical implications.

In addition, Arti fi cial Intelligence deals with possible correlations and therefore raises concerns about data selection, representation and population estimates.

Researchers should take care to understand the representativeness of the data used and report potential biases.

Moreover, policymakers should be aware of potential biases and account for them when making decisions, as inaccurate and biased data could lead to harmful and unfair policy decisions.

Finally, we could also identify a procedural component of fairness, requiring that any employees, contractors or other parties involved in data Processing undergo training to educate them about these risks and the steps to be taken to mitigate them. 

### 17.2.4 TRANSPARENCY Alongside

 fairness, transparency is another crucial aspect of data protection.

According to this principle, the Processing of Personal Data must be transparent 65 for the Data Subjects involved, who should receive key information concerning the Processing when their data are collected. 66 Transparency also contributes to the application of the fairness requirement in data protection.

Given the complexity of the Processing, transparency on its methodology (including where possible the algorithm) is very important, so that the rigour of the approach can be independently assessed (beyond the Data Subjects ’ right of infor- mation 67 ) and is the main requirement to perform a meaningful risk analysis.

Transparency, however, can be a challenging principle to apply when it comes to Arti fi cial Intelligence, since these solutions are based on advanced technology that 63 Council of Europe (CoE), Arti fi cial Intelligence and Data Protection: Challenges and Possible Remedies | T-PD(2018)09Rev , 2. 64 Article 29 Data Protection Working Party, Guidelines on automated individual decision-making . 65 See Section 2.5.1 – The principle of the fairness and lawfulness of Processing. 66 See Section 2.10 – Information. 67 See Section 17.3 – Rights of Data Subjects, and Section 17.5 – International Data Sharing. 17 ARTIFICIAL INTELLIGENCE 311 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of can be hard to understand and explain in lay terms. 68 Moreover, many Machine Learning models include multilayered networks in which the outputs are a result of an internal process that may not be replicated or understood mathematically even by the data scientists and the solution designers themselves. 69 This multilayered archi- tecture is commonly known as the “ black box ” , since it may make it impossible for those using the solution to understand how it reached a speci fi c conclusion or prediction.

In other words, the reasoning behind the functioning of these applications is in most cases not transparent or intelligible for human beings; consequently, it is dif fi cult to assess the fairness and quality of the process.

One suggested answer to the challenge of transparency in Arti fi cial Intelligence applica- tions is to explain the logic behind the solutions, in other words giving information about the type of input data and the expected output, explaining the variables and their weight, or shining light on the analytics architecture.

This approach, known as “ interpretabil- ity ” , focuses on understanding the causality of a change in the input to the output, without necessarily explaining all the logic of the machine through its multiple layers.

In the case of black boxes, however, achieving interpretability will often be dif fi cult and it is important to be transparent with Data Subjects about unknowns and areas of uncertainty.

Other approaches are based on selective disclosure or contractual strat- egies, but they also suffer some limits or cannot be generalized. 70 Humanitarian Organizations need to work with developers on the issue of “ explain- ability ” , especially when they intend to use Arti fi cial Intelligence solutions to support decision making.

They should be able to explain to Data Subjects how the solution works, what risks may arise, how the Arti fi cial Intelligence system achieves its outcomes and what arrangements are in place for a human decision maker to review its decisions or suggestions if needed.

Finally, care should be taken in decision making about transparency if it con fl icts with data sensitivity at the individual level, or when transparency in Processing could encourage circumvention of the data Processing system by malicious actors and thus bias it. 

### 17.2.5 DATA MINIMIZATION The data minimization principle requires organizations to limit the Processing of Personal Data to the minimum amount and extent necessary to achieve the purpose of the

 Processing. 71 With the use of Arti fi cial Intelligence, however, large-scale 68 The Norwegian Data Protection Authority, Arti fi cial Intelligence and Privacy , 19. 69 Future of Privacy Forum, The Privacy Expert ’ s Guide to Arti fi cial Intelligence and Machine Learning , 17. 70 See also Andrew D.

Selbst and Solon Barocas, “ The intuitive appeal of explainable machines ” , Fordham Law Review , Vol. 87, No. 3, 2019 2018, pp. 1085 – 1140. 71 See Section 2.5.4 – The principle of data minimization. 312 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Processing is often required for its functioning, and moreover the search for new patterns and correlations in data sets can make it dif fi cult to circumscribe the range of data used. 72 Moreover, training such solutions using suitably large and representa- tive data sets is also necessary to reduce potential bias in their outcomes. 73 Despite this tension between Arti fi cial Intelligence and data minimization, various solutions are possible to balance the different needs.

These are set out below, along with their potential limitations: • Employing techniques that can make it harder to identify individuals through the data, such as restricting the amount and nature of the information used.

This approach may not fi t certain Arti fi cial Intelligence solutions that require large amounts of data to function well.

In addition, making data hard to identify does not, by itself, guarantee respect for the data minimization principle. • Using “ synthetic data ” as training data.

Synthetic data “ is an arti fi cial data set, including the actual data on no ‘ real ’ individuals, but which mirrors in characteristics and proportional relationships all the statistical aspects of the original dataset ” . 74 This is a very promising solution, 75 but it still requires real data as a starting point.

It also requires more expertise from data scientists, and it may suffer from some limitations stemming from the replication process and the dif fi culty of ensuring accuracy when many variables and complex situations are considered. • Adopting a progressive approach by collecting what is thought to be the minimum amount of data necessary to achieve the expected results and then testing the solution to see how it performs.

After testing, more data may be added if needed, and the solution can be tested again until it achieves the desired outcomes.

This approach reduces the Processing of unnecessary data and seeks to ensure that the solution is trained on the minimum possible data set, while also making Reidenti fi cation harder.

Despite the challenges associated with data minimization in Arti fi cial Intelligence, this principle does not mean that large-scale Processing is forbidden, but rather that it poses higher risks that require appropriate security and risk-mitigation measures.

Moreover, as mentioned previously, not all Arti fi cial Intelligence solutions require large volumes of data to be accurate.

Those based on reinforcement learning, for instance, can be trained with little data.

The data processed by Humanitarian Organizations should be adequate and relevant for the purposes for which they are collected and processed.

This means ensuring 72 Centre for Information Policy Leadership, Arti fi cial Intelligence and Data Protection in Tension , 14. 73 Ibid., 13. 74 Future of Privacy Forum, The Privacy Expert ’ s Guide to Arti fi cial Intelligence and Machine Learning , 8. 75 Council of Europe (CoE), Arti fi cial Intelligence and Data Protection: Challenges and Possible Remedies | T-PD(2018)09Rev . 17 ARTIFICIAL INTELLIGENCE 313 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of that data collection is not excessive and that the time period for which the data are stored, before being anonymized or archived, is limited to the minimum necessary.

The amount of Personal Data collected and processed should, ideally, be limited to what is necessary to ful fi l the speci fi ed purpose(s) of data collection, data Processing or compatible Further Processing, or to what is justi fi ed on another legal basis.

Finally, although Arti fi cial Intelligence often requires large-scale data sets, it is always crucial to carefully design the data strategy, by keeping the contents of data sets collected by Humanitarian Organizations to the minimum necessary for the purposes of the Processing and de fi ning the purpose of data Processing as speci fi cally as possible.

Data Controllers and, where applicable, Data Processors should carefully consider the design of their data analysis, in order to minimize the presence of redundant and marginal data. 76 

### 17.2.6 DATA RETENTION Personal Data should be retained only for a de fi ned period as necessary for the purposes for which they were

 collected. 77 Following the initial retention period an assessment should be made as to whether the data should be deleted or whether they should be kept for a longer period to achieve the purpose.

If this Processing is performed on pre-existing data sets, as “ compatible Further Processing ” , 78 the Processing should take place within the data retention period allowed for the purpose of initial collection.

Renewal of the initial retention period, if a renewal is contem- plated by the retention policy at the time of collection, can take place to enable analytics as “ compatible Further Processing ” .

However, in the Arti fi cial Intelligence context, a longer period for data retention may be justi fi ed when data are used to monitor the performance system 79 and prevent unexpected biases.

If a model shows bias, it can be helpful to have the training data set available to investigate the potential source of the bias.

During the retention period, Data Controllers must ensure that data remain updated to reduce the risk of inaccuracies. 80 Given the variety of uses Arti fi cial Intelligence may have in the humanitarian sector, speci fi c retention periods should be considered in the context of each programme.

In this regard, Humanitarian Organizations should consider and set an initial reten- tion period, such as a two-year period for audit purposes.

Should the data still be 76 Council of Europe (CoE), Guidelines on the protection of individuals with regard to the processing of personal data in a world of Big Data | T-PD(2017)01 . 77 See Section 2.7 – Data retention. 78 See Subsection 2.5.2.1 – Further Processing. 79 Centre for Information Policy Leadership, Arti fi cial Intelligence and Data Protection in Tension , 15. 80 Article 29 Data Protection Working Party, Guidelines on automated individual decision-making , 12. 314 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of needed after this initial period, organizations should conduct periodic assessments based on their retention needs and consider their legal basis for amending the retention period.

They will also need to seek additional Consent from Data Subjects if their data are retained for longer than the duration they consented to at the point of collection. 

### 17.2.7 DATA SECURITY Data security

 81 is an essential aspect of Arti fi cial Intelligence solutions, particularly in the humanitarian sector.

Humanitarian Organizations must be mindful of the risks that these technologies pose and implement the highest level of data security when using them.

Attacks by malicious parties typically fall into one of three categories: • model inversion attacks : attempts to reveal information about the training data by inverting the system ’ s model; • poisoning attacks : attempts to decrease the utility of the model; • backdoor attacks : attempts to gain unauthorized access to the solution and modify it after it has been trained.

Looking speci fi cally at model inversion, it has been demonstrated that some systems remember their training data sets.

For example, if a person ’ s face has been used to train a facial recognition system, a malicious party could query the system again and again, slowly changing the input image to reconstruct the face with suf fi cient preci- sion to know that the person in question was part of the training set. 82 Another type of deliberate attack involves adding noise to the data in order to decrease the quality of outcomes, sometimes even leading to useless results such as making wrong classi fi cations and predictions.

All these factors mean that inadequate data security can pose signi fi cant risks for vulnerable individuals in the context of the use of Arti fi cial Intelligence.

In view of these risks, it is important to build strong and secure systems that effectively protect against unauthorized access.

Pseudonymization and encryption techniques are some of the methods that can assist in this regard.

While the technique of training models on encrypted data is still in its early days, static models that receive encrypted inputs and produce encrypted outputs are already commonplace, albeit with their own constraints.

The use of differential privacy 83 should also be considered when training Arti fi cial Intelligence solutions. 81 See Section 2.8 – Data security and Processing security. 82 Matt Fredrikson, Somesh Jha and Thomas Ristenpart, “ Model inversion attacks that exploit con fi dence information and basic countermeasures ” , in CCS ’ 15: Proceedings of the 22nd ACM SIGSAC Conference on Computer and Communications Security , ACM, Denver, CO, 2015, 1322 – 1333: doi.org/10.1145/2810103.2813677. 83 “ Differentially-private algorithms are resilient to adaptive attacks that use auxiliary information.

These algorithms rely on incorporating random noise into the mix so that everything an adversary receives 17 ARTIFICIAL INTELLIGENCE 315 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Finally, in considering the suitability of security measures required to protect infor- mation in Arti fi cial Intelligence-based solutions, it is important to take into account that the outputs of the Processing may produce more Sensitive Data than the initial data sets, including individual or group pro fi ling, and could prove harmful to the individuals concerned if they fall into the wrong hands.

In this case, the Humanitarian Organization should implement adequate security measures to protect the output, which are appropriate for the risks involved. 84 Additionally, regular data security and data privacy training is essential to raise awareness of security threats and to avoid Data Breaches. 

### 17.3 RIGHTS OF DATA SUBJECTS Data Controllers are responsible for determining the means and purposes of the Processing and for ensuring that Data Subjects can exercise their

 rights. 85 Although Arti fi cial Intelligence may make it more dif fi cult for Data Controllers to comply with these obligations, choosing such solutions as a means to achieve a certain purpose does not excuse Data Controllers from their responsibilities.

Humanitarian Organizations should therefore have procedures and systems in place to ensure that individuals can exercise their rights.

At the same time, as is discussed in Section 2.11 – Rights of Data Subjects, the exercise of these rights may be limited in certain circumstances. 

### 17.3.1 RIGHTS RELATED TO AUTOMATED DECISION MAKING Data Subjects have the right to not be subjected to solely automated decision

 making, i.e. “ decisions by technological means without human involvement ” , 86 when such deci- sions produce legal effects or similarly signi fi cantly affect the individual in question.

EXAMPLE: Some examples of solely automated decision making include speeding fi nes imposed purely on the basis of evidence from speed cameras, automatic refusal of an online credit application or e-recruiting practices without any human intervention. 87 becomes noisy and imprecise, and so it is much more dif fi cult to breach privacy (if it is feasible at all) ” .

Aaruran Elamurugaiyan, “ A Brief Introduction to Differential Privacy ” Medium, 31 August 2018: https://medium.com/georgian-impact-blog/a-brief-introduction-to-differential- privacy-eacf8722283b. 84 See Section 17.2.7 – Data security, and Section 2.8 – Data security and Processing security. 85 See Section 2.11 – Rights of Data Subjects. 86 Council of Europe (CoE), Arti fi cial Intelligence and Data Protection: Challenges and Possible Remedies | T-PD(2018)09Rev , 8. 87 Ibid. 316 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of The rationale behind this right “ is driven by a concern for algorithmic bias; a worry of incorrect or unsubstantiated solely automated decisions based on inaccurate or incomplete data; and the need for individuals to have redress and the ability to contest a decision if an Arti fi cial Intelligence system is incorrect or unfair ” . 88 These concerns are justi fi ed by examples such as the Swedish bene fi ts case mentioned above, where a rogue solution meant that “ thousands of unemployed people were wrongly denied bene fi ts ” . 89 In Humanitarian Action, a similar problem could arise if Arti fi cial Intelligence solutions make decisions about who receives aid or who is included in a target population for an aid programme.

Bene fi ciaries should always have the right to have a human being oversee decisions that affect them.

It should be noted that “ [t]o qualify as human involvement, the controller must ensure that any oversight of the decision is meaningful, rather than just a token gesture ” . 90 This is particularly important because those making decisions may blindly rely on the Arti fi cial Intelligence solution ’ s suggestions on the basis that mathematical algorithms are supposedly failproof.

Consequently, the presence of an individual human decision maker alone is not suf fi cient.

The decision maker must have the ability to refute the machine ’ s decision or suggestion. 91 On a similar note, decision makers may not fully understand how the system arrived at a particular decision or suggestion and may therefore fi nd it dif fi cult to assess whether it was made wrongly (see Section 17.2.4 – Transparency, above).

Decision makers should always be able to examine all the facts and information from scratch and make an independent decision, without considering the Arti fi cial Intelligence solution ’ s outcome.

This is not always straightforward, however, since an Arti fi cial Intelligence solution is able to process much more information than a person in the same situation.

Setting up a multidisciplinary team, including individ- uals with expertise in the sector and technology developers, may be one option in such cases.

It is possible that individuals, regardless of their level of expertise, may be reluctant to challenge an Arti fi cial Intelligence system ’ s automated decisions, given how accurate the technology can be.

Consequently, another issue to take into account is how the human intervention would be arranged so that a review of the decision is “ carried out by someone who has the appropriate authority and capability to change the deci- sion ” . 92 Organizations therefore need to consider whether it would be acceptable 88 Centre for Information Policy Leadership, Arti fi cial Intelligence and Data Protection in Tension , 16. 89 Willis, “ Rogue Algorithm Stops Welfare Payments ” . 90 Article 29 Data Protection Working Party, Guidelines on automated individual decision-making , 21. 91 Council of Europe (CoE), Arti fi cial Intelligence and Data Protection: Challenges and Possible Remedies | T-PD(2018)09Rev . 92 Article 29 Data Protection Working Party, Guidelines on automated individual decision-making , 27. 17 ARTIFICIAL INTELLIGENCE 317 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of for bene fi ciaries to be subjected to automated decision making if they had the right to request human intervention.

Here, the very case for using the technology in the fi rst place may come under challenge.

In any case, it is essential that bene fi ciaries are informed about any automated decision making they are being subjected to, including the logic behind the Arti fi cial Intelligence solution, the signi fi cance of the Processing and its envisaged consequences for them. 93 They must also be able to object to the Processing.

The rights of the Data Subjects are described in Section 2.11 – Rights of Data Subjects.

The rights to information, access, correction, erasure and objection are considered crucial components of an effective data protection policy.

However, Arti fi cial Intelligence-based Processing of Personal Data poses signi fi cant challenges.

The Data Subject ’ s exercise of the right to information about automated decision making (also relevant to the transparency principle, see Section 17.2.2 – Purpose limitation and Further Processing) is more dif fi cult in the Arti fi cial Intelligence context, given the complexity of such systems and how they operate.

It is therefore important to explore alternative means of Arti fi cial Intelligence transparency and consider new forms of information provision, such as the creation of public registers describing the key functions and characteristics of the most impactful systems.

It may also be advisable to investigate the provision of information to representatives of potentially affected groups.

Organizations engaged in humanitarian use of Arti fi cial Intelligence are encour- aged to incorporate complaint procedures into their Personal Data Processing practices and internal data protection policies.

These procedures should enable data correction and erasure.

However, it should be recognized that the exercise of certain individual rights may be limited by the legal basis of the Processing.

For example, requests for opt-outs by individuals may not be observed in the event of Processing undertaken under the legal basis of public interest described above.

Humanitarian Organizations need to ensure that no automated decisions are taken with regard to individuals which could lead to harm or exclusion from humanitarian programmes, without any human intervention.

In practice, this means that a human being should always be the fi nal decision maker when decisions are taken on the basis of Arti fi cial Intelligence outputs that may have adverse effects on individuals. 93 Ibid., 25. 318 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of EXAMPLE In the event of aid distribution, a decision based on output from Arti fi cial Intelligence to prioritize a speci fi c region or group of people (to the disadvantage of those left out of these regions or groups) should always be cross-checked and validated by a human being. 

### 17.4 DATA

 CONTROLLER/DATA PROCESSOR RELATIONSHIP Arti fi cial Intelligence solutions tend to blur the traditional distinction between the roles of Data Controller and Data Processor, which is centred on the idea of power to control and supervise the data Processing in relation to the de fi nition of its purposes and means.

This is largely due to the fact that in the case of Arti fi cial Intelligence solutions, providers retain important privileges as regards the organization of the service and Arti fi cial Intelligence architecture. 

### 17.4.1 ACCOUNTABILITY To have a proper allocation of accountability and liability

 obligations, it is crucial to carefully determine which entity actually acts as Data Controller, retaining the control over personal information and a general power to manage the purposes and means of data Processing, and which processes Personal Data on behalf of the Data Controller and is therefore a Data Processor.

It is also possible that more than one entity jointly determines the purposes and means of the Processing and may be considered as joint Data Controllers.

EXAMPLE 1: Humanitarian Organizations sharing data sets and undertaking Data Analytics using their own organizational resources may be considered joint Data Controllers.

EXAMPLE 2: Humanitarian Organizations sharing data sets but outsourcing the Data Analytics to a commercial service provider that will transfer the fi ndings and keep no records for its own use will be considered joint Data Controllers, and the service provider will be considered a Data Processor.

In accordance with their different roles and respective spheres of competence, Data Controller and Data Processor are accountable for the decisions they adopt concern- ing data Processing.

However, as explained above, Arti fi cial Intelligence sometimes evolves in ways that cannot be fully understood by developers themselves due to the “ black box ” effect.

This may raise questions around the concrete implementation of 17 ARTIFICIAL INTELLIGENCE 319 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of the accountability principle, which requires Data Controllers to comply with data protection requirements and to be in a position to demonstrate that they have taken adequate and proportionate technical and organizational measures within their respective Processing operations. 94 

### 17.4.2 LIABILITY Automated decision making

 (see above) raises particular issues around liability.

In health care, for instance, machines are often considered to be more accurate than humans in diagnosing certain diseases such as speci fi c types of cancer, or at analys- ing X-ray images.

For this reason, doctors may feel compelled to follow the machine ’ s recommendation. 95 Here, it might be unclear who is responsible for the diagnosis. 96 To counterbalance this, organizations may seek to extend the product liability logic to algorithms, thereby placing the full burden of liability on the developer company (although this may be very dif fi cult to negotiate in practice).

From an ethical per- spective, it is also important for Humanitarian Organizations to understand their own responsibilities when choosing to use such technology and to be accountable to bene fi ciaries accordingly.

In a different scenario, the performance of Arti fi cial Intelligence systems can be signi fi cantly affected by the poor quality of data available in a given context, such as in geographic areas where the use of poor scanning technologies generates biases in image-based diagnoses.

In these cases, Humanitarian Organizations must there- fore carefully assess the data quality to avoid potential liability.

Some speci fi c tools, such as a data management plan and DPIA, can contribute to better clarify the roles of different parties engaged in the Processing.

Once these roles have been de fi ned and the corresponding tasks assigned, it is important to establish which relevant contracts need to be entered into among the data Processing participants.

Data collection or International Data Sharing across Humanitarian Organizations and/or national borders and/or third (private or state) bodies should generally be covered by contractual clauses.

These contracts are important and can play a key role in liability management for the following reasons: 94 See Section 2.9 – The principle of accountability. 95 Victor Demiaux and Yacine Si Abdallah, “ Comment permettre à l ’ homme de garder la main? Les enjeux éthiques des algorithmes et de l ’ intelligence arti fi cielle ” , French Data Protection Authority (CNIL), Paris, December 2017, 27: www.cnil.fr/sites/default/ fi les/atoms/ fi les/cnil_rapport_garder_la_main_ web.pdf. 96 Ibid. 320 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of • They should clearly allocate the roles between the various parties and, in particu- lar, put them on notice as to whether they are acting as Data Controllers, Data Processors or joint controllers. • They should contain an outline of the data protection obligations to which each party is subject.

This should include the measures that the parties should take to protect Personal Data transferred across borders. • They should contain obligations to cover data security, responses (objection or noti fi cation to the other party) in case of authorities requesting access to data, procedures for handling Data Breaches, Data Processor return/disposal of data at the end of the Processing, and staff training. • They should also require that notice be given to the Humanitarian Organizations involved if any data are accessed without authorization. 

### 17.5 INTERNATIONAL DATA SHARING Personal Data and other types of data processed in Arti fi cial Intelligence solutions often cross national borders due to the presence of international service providers and the use of cloud computing

 services.

This leads to the application of provisions and practices relating to international cross-border data fl ows. 97 In this regard, attention must be paid to applicable law and jurisdiction.

International data sharing may involve several scenarios: • Personal Data are transferred by a Humanitarian Organization (Data Controller) to Third Parties (Data Processors), either commercial entities or other Humanitarian Organizations, to be processed in its behalf, e.g. cloud computing service providers; • Personal Data are shared among Humanitarian Organizations, public authorities and/or commercial entities (joint Data Controllers), e.g. partnership in joint actions; • Personal Data are transferred to other Humanitarian Organizations, public author- ities and/or commercial entities that autonomously process such information for their own purposes (Data Controllers).

Data protection laws restrict International Data Sharing, so Humanitarian Organizations should have mechanisms in place to provide a legal basis for it when Data Analytics are conducted, as discussed above. 98 It is essential to assess the potential data transfer risks prior to International Data Sharing, taking into account the local regulations in the country of destination, and to inform Data Subjects adequately.

In case of potential risks, suitable mitigating measures can be adopted, both at contractual level 97 See Chapter 4: International Data Sharing. 98 See Section 17.2.1 – Legal bases for Personal Data Processing. 17 ARTIFICIAL INTELLIGENCE 321 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of (e.g. contractual clauses, codes of conduct) and at technical level (e.g. data encryption, strong Pseudonymization).

When the risk is high and the mitigation measures cannot reduce it, a decision should be taken to refrain from data sharing. 99 Since in many cases International Data Sharing concerns the use of Third Party services, when Humanitarian Organizations hire Arti fi cial Intelligence service providers, they should collect all relevant information on cross-border data transfers.

In some cases, companies providing Arti fi cial Intelligence solutions may have an incentive to use and exploit the results of the Processing of Humanitarian Organizations ’ data (e.g. commer- cial purposes, pro fi ling).

It is therefore very important that any contractual arrange- ments with them make it completely clear that the purpose of the Processing is and must remain exclusively humanitarian, and that the service provider keeps the humani- tarian Processing segregated from its commercial activities.

If any doubts arise as to whether the service provider can or will respect this condition, the Humanitarian Organization should refrain from engaging in the Processing.

This is because any Processing other than Processing exclusively for Humanitarian Action may have serious implications for Data Subjects.

For example, outputs of analytics which identify categories of potential bene fi ciaries of Humanitarian Action may lead to consequences such as denial of credit, higher insurance premiums, stigmatization, discrimination or even persecution.

Humanitarian Organizations should also be alert to the risk that, in situations of violence or con fl ict, the parties involved may seek to access and use the fi ndings of Arti fi cial Intelligence-based analyses to gain an advantage, which would compromise the safety of the Data Subjects and the neutrality of Humanitarian Action.

Consequently, in cases where the outputs are potentially sensitive, it is important to consider a scenario where Humanitarian Organizations develop their own Arti fi cial Intelligence applications without recourse to Third Party solutions. 

### 17.6 DATA PROTECTION IMPACT ASSESSMENT AND HUMAN RIGHTS IMPACT ASSESSMENT Since the use of Arti fi cial Intelligence can pose substantial data protection risks to

 individuals, an organization should carry out a Data Protection Impact Assessment (DPIA) before making a decision to implement such a solution.

A DPIA involves identifying, evaluating and addressing the impacts on Data Subjects and their Personal Data of a project, policy, programme or other initiative that entails 99 See Chapter 4: International Data Sharing, and Section 4.4 – Mitigating the risks to the individual. 322 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of the Processing of such data. 100 It should ultimately lead to measures that avoid, minimize, transfer or share risks associated with the Processing activities.

A DPIA is a continuous process and should follow a project or initiative that involves the Processing of individuals ’ data throughout its life cycle.

Given the limits to transparency in the use of Arti fi cial Intelligence, publicly available DPIAs can also help increase bene fi ciaries ’ acceptance and use of Arti fi cial Intelligence solutions by Humanitarian Organizations.

DPIAs are important tools during project design to ensure that all aspects of applic- able data protection regulations and potential risks are covered. 101 DPIAs are now required in many jurisdictions and by some Humanitarian Organizations.

Apart from clarifying the details and speci fi cations of the Processing, DPIAs should focus on the risks posed by it and on mitigating measures.

These risks, according to the most relevant models of DPIA, are not limited to the right to privacy and data protection but should include risks to the rights and freedoms of natural persons. 102 In line with the by-design approach and the minimization of data Processing-related risks, DPIAs need to be conducted prior to any Arti fi cial Intelligence-based operations and updated when Processing operation or context- ual elements change.

Several risks can be considered in a DPIA including, according to the speci fi c Processing operations, the nature of processed data, the inferences extracted using Arti fi cial Intelligence applications, and the context where Processing is carried out.

Some examples concern the risk of Reidenti fi cation of individuals of relevance for Humanitarian Action, in case of use of anonymized data or pseudonymized/ aggregate results made available to Third Parties, or the risk that the results of Arti fi cial Intelligence-based analysis performed by Humanitarian Organizations may be exploited by commercial Third Parties and/or authorities for unrelated purposes.

Further examples of risks that should be considered in the broader context of human rights protection include: • requests to Humanitarian Organizations for speci fi c patterns or information about certain categories of individuals by authorities or corporations that could poten- tially expose Data Subjects to discrimination or detrimental consequences and compromise the neutrality of Humanitarian Action; 100 See Chapter 5: Data Protection Impact Assessments (DPIAs). 101 See Chapter 5: Data Protection Impact Assessments (DPIAs). 102 For assessment tools speci fi cally developed to assess the risks in Humanitarian Action, see UN Global Pulse, Tools: Risks, Harms and Bene fi ts Assessment . 17 ARTIFICIAL INTELLIGENCE 323 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of • access and use of the results of Arti fi cial Intelligence-based analysis by parties in a situation of violence or con fl ict to gain an advantage over other stakeholders and thus compromise the safety of the Data Subjects and the neutrality of Humanitarian Action.

Finally, considering the role of Arti fi cial Intelligence service providers in Humanitarian Action, the DPIA should also consider the risk that commercial pro- viders may have incentives to exploit the fi ndings of the Processing for commercial purposes, e.g. to improve their understanding of their current or potential customers or for further customer pro fi ling. 103 With regard to the risk identi fi ed in the DPIA, the assessment considers the likelihood and severity of potential negative impacts on Data Subjects, also considering com- peting rights and freedoms and legitimate interests recognized by the law.

On the basis of the analysis of this potential impact, speci fi c mitigation measures are adopted, including in the design of the used solutions, such as Anonymization techniques, privacy-enhancing technical measures, and legal and contractual obliga- tions to prevent possible Reidenti fi cation of the persons concerned. 104 Although DPIA has become a mandatory requirement under national and inter- national 105 law, assessment methodologies mainly adopt a limited perspective with a main focus on Processing, task allocation, data quality and data security, without adequately considering all the human rights potentially impacted by Arti fi cial Intelligence applications, their diversity and complexity.

However, as pointed out by the UN High Commissioner for Human Rights, 106 it is necessary to adopt a broader perspective, embedding human rights in Arti fi cial Intelligence development, deployment and use, with a comprehensive by-design approach to counter potential adverse impacts. 

### 17.6.1 HUMAN RIGHTS IMPACT ASSESSMENT FOR ARTIFICIAL INTELLIGENCE Human Rights Impact Assessment

 (HRIA) can thus guide Arti fi cial Intelligence develop- ers and users from the outset in the design of new Arti fi cial Intelligence solutions, facilitating comparison between alternative design options, and following the product/ service throughout its life cycle, by using an iterative approach, based on risk assessment 103 See Section 2.3: Aggregate, Pseudonymized and Anonymized data sets. 104 Council of Europe (CoE), Guidelines on the protection of individuals with regard to the processing of personal data in a world of Big Data | T-PD(2017)01 . 105 Council of Europe (CoE), Convention 108; Council of Europe (CoE), Protocol Amending the Convention for the Protection of Individuals with Regard to Automatic Processing of Personal Data, para. 10. 106 Of fi ce of the United Nations High Commissioner for Human Rights (OHCHR), A/HRC/48/31: The Right to Privacy in the Digital Age , report of the United Nations High Commissioner for Human Rights, UN Doc, OHCHR, 15 September 2021, www.ohchr.org/en/documents/thematic-reports/ahrc4831-right- privacy-digital-age-report-united-nations-high. 324 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of and design mitigation solutions.

For these reasons, HRIA is considered the cornerstone of future Arti fi cial Intelligence regulation at international and regional level. 107 However, in dealing with the impact of Arti fi cial Intelligence, traditional HRIA method- ologies cannot be applied directly but must be contextualized by considering the speci fi c nature of Arti fi cial Intelligence.

The two most relevant changes introduced in the HRIA in relation to the Arti fi cial Intelligence context concern the ex ante nature of the assessment carried out and the greater focus on quanti fi able risk thresholds.

As for the former, an ex ante approach is required by the guiding role that HRIA aims to play in Arti fi cial Intelligence project design and development, as opposed to the ex post evaluation centred on corrective policies that usually characterizes traditional HRIA.

Regarding the focus on risk thresholds, this is in line with the requirements emerging in the regulatory debate on Arti fi cial Intelligence where the de fi nition of different risk levels is crucial in the acceptability of Arti fi cial Intelligence products and services, and directly impacts on the obligations of Arti fi cial Intelligence manufacturers, providers and users.

A quantitative dimension of assessment, in terms of ranges of risks, is therefore needed both for Arti fi cial Intelligence design guidance and legal compliance.

Compared to the voluntary and policy-based traditional HRIA practice in the business sector, once HRIA becomes a legal tool it is no longer merely a source of recommen- dations for better business policy.

Future Arti fi cial Intelligence regulation will most likely bring speci fi c legal obligations and sanctions for non-compliance in relation to risk assessment and management, as well as given risk thresholds (e.g. high risk). 

### 17.6.2 HUMAN RIGHTS IMPACT

 ASSESSMENT: PHASES AND PROCEDURE Notwithstanding these important differences impacting on the assessment method- ology, the main building blocks of the assessment procedure remain the same and are similar to the phases of DPIA schemes: (i) the planning and scoping phase and (ii) the data collection and analysis phase.

The fi rst stage deals with the de fi nition of the HRIA target, identifying the main features of the product/service and the context in which it will be placed.

There are three main areas to consider at this stage: (i) description and analysis of the type of product/service; (ii) analysis of the human rights context; (iii) identi fi cation of relevant stakeholders. 107 CoE (Ad Hoc Committee on Arti fi cial Intelligence (CAHAI)) “ 5th Meeting, Strasbourg, 5 – 7 July 2021: Abridged Meeting Report and List of Decisions ” , 7 July 2021, CAHAI(2021)10: www.coe.int/en/web/ arti fi cial-intelligence/cahai-1; European Commission, Proposal for a Regulation of the European Parliament and of the Council Laying down Harmonised Rules on Arti fi cial Intelligence (Arti fi cial Intelligence Act) and Amending Certain Union Legislative Acts , 21 April 2021, COM/2021 206 fi nal. 17 ARTIFICIAL INTELLIGENCE 325 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of The second stage focuses on relevant empirical evidence to assess the impact on human rights.

Since in most cases the assessment is not based on measurable vari- ables, the impact on rights and freedoms is necessarily the result of expert evaluation, where expert opinion relies on knowledge of case law, the literature and the legal framework.

This means that it is not possible to provide a precise measurement of the expected impacts but only an assessment in terms of range of risk.

In line with risk assessment procedures, three key factors must be considered: risk identi fi cation, likelihood (L) and severity (S).

With regard to the fi rst, the focus on human rights and freedoms already de fi nes the potentially affected categories and the case-speci fi c analysis identi fi es those concretely affected, depending on the technolo- gies used and their purposes.

Since this is a rights-based model, risk concerns the prejudice to rights and freedoms, in terms of unlawful limitations and restrictions, regardless of material damage.

The expected impact of the identi fi ed risks is assessed by considering both the likelihood and the severity of the expected consequences, using a four-step scale (low, medium, high, very high) to avoid any risk of average positioning.

Likelihood is the combination of the probability of adverse consequences and the exposure (Table 17.3).

The former concerns the probability that adverse conse- quences of a certain risk might occur (Table 17.1) and the latter the potential number of people at risk (Table 17.2).

Both these variables must be assessed on a contextual basis and the engagement of relevant shareholders can be of help.

The severity of the expected consequences (Table 17.6) is estimated by considering the gravity of the prejudice in the exercise of rights and freedoms (Table 17.4) and the effort to overcome it and to reverse adverse effects (Table 17.5).

Table 

### 17.1 Probability Low The risk of prejudice is improbable or highly

 improbable. 1 Medium The risk may occur. 2 High There is a high probability that the risk occurs. 3 Very high The risk is highly likely to occur. 4 Table 

### 17.2 Exposure Low Few or very few of the identi fi ed population of

 rights-holders are potentially affected. 1 Medium Some of the identi fi ed populations are potentially affected. 2 High The majority of the identi fi ed population is potentially affected. 3 Very high Almost the entire identi fi ed population is potentially affected. 4 326 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Taking into consideration the L and S values, the overall impact is determined using a table (Table 17.7) where colours from lightest to darkest represent the overall impact, from lowest to highest.

Once the potentially adverse impact has been assessed for each of the rights and freedoms considered, a radial graph (Graph 17.1) of the overall Table 

### 17.3 Likelihood table

 (L) Probability 1 2 3 4 Exposure 1 1 2 3 4 2 2 3 5 9 3 3 5 9 12 4 4 7 12 15 Likelihood Low 1 Medium 2 High 3 Very high 4 Table 

### 17.4 Gravity of the prejudice Gravity of the prejudice Low Affected individuals and groups may encounter only minor prejudices in the exercise of their rights and

 freedoms. 1 Medium Affected individuals and groups may encounter signi fi cant prejudices. 2 High Affected individuals and groups may encounter serious prejudices. 3 Very high Affected individuals and groups may encounter serious or even irreversible prejudices. 4 Table 

### 17.5 Effort to overcome the prejudice and to reverse adverse effects Effort Low Suffered prejudice can be overcome without any problem

 (e.g. time spent amending information, annoyances, irritations, etc.). 1 Medium Suffered prejudice can be overcome despite a few dif fi culties (e.g. extra costs, fear, lack of understanding, stress, minor physical ailments, etc.). 2 High Suffered prejudice can be overcome albeit with serious dif fi culties (e.g. economic loss, property damage, worsening of health, etc.). 3 Very high Suffered prejudice may not be overcome (e.g. long-term psychological or physical ailments, death, etc.). 4 17 ARTIFICIAL INTELLIGENCE 327 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of Table 

### 17.6 Severity table

 (S) Gravity 1 2 3 4 Effort 1 1 2 4 6 2 2 3 5 8 3 3 5 8 10 4 5 8 10 12 Severity Low 1 Medium 2 High 3 Very high 4 Table 

### 17.7 Overall risk impact table Severity

 [impacted right/freedom] Low Medium High Very high Likelihood Low Medium High Very high 1 2 3 4 Privacy and data protection Freedom of thought Physical integrity 1 Low impact 2 Medium impact 3 High impact 4 Very high impact Graph 17.1.

Radial graph (impact) example 328 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of impact can be used to decide the priority of intervention in altering the characteristics of the product/service to reduce the expected adverse impacts.

Factors that can exclude the risk from a legal perspective (e.g. the mandatory nature of certain impacting features) should be considered.

After the fi rst adoption of the appropriate mitigation measures for the foreseen risks, further rounds of assessment can be conducted according to the level of residual risk and its acceptability. 

### 17.7 DATA PROTECTION BY DESIGN AND BY DEFAULT Data Protection by design and by default involves designing a Processing

 operation, programme or solution in a way that implements key data protection principles from the outset, and that provides the Data Subject with the greatest possible data protec- tions (see Chapter 6: Designing for data protection).

The key data protection prin- ciples in this sense are: • lawfulness, fairness and transparency; • purpose limitation; • data minimization; • accuracy; • storage limitation (limited retention); • integrity and con fi dentiality (security); • accountability.

The by-design approach also represents the concrete implementation of the impact assessment concerning data Processing.

The adoption of speci fi c mitigation measures or changes to the system design are usually the main way to tackle the potential risks identi fi ed in the impact assessment.

The measures to be adopted from a data protection by design perspective are neces- sarily context-speci fi c, but solutions such as synthetic data, Pseudonymization, Anonymization (where possible) and encryption techniques are frequently compon- ents of the by-design approach. 

### 17.8 ETHICAL ISSUES AND CHALLENGES Given the speed at which technologies are

 evolving, the law often lags behind major societal changes.

It is therefore likely that some of the ethical issues associated with Arti fi cial Intelligence solutions are not yet covered by existing laws.

In addition, there is a sphere of social and ethical issues and values that is not re fl ected in legal provisions but is relevant in de fi ning a given community ’ s approach to the use of data-intensive Arti fi cial Intelligence systems and their social acceptability. 17 ARTIFICIAL INTELLIGENCE 329 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of When opting to develop or use Arti fi cial Intelligence solutions, Humanitarian Organizations should of course consider whether they comply with data protection laws and data protection by design principles.

Importantly, however, they should also re fl ect on potential adverse impacts on the ethical and social implications of the data Processing. 108 For more guidance on the topic of analysing systems, see Section 6.3.3 – Analysing purpose limitation.

Arti fi cial Intelligence tools present many risks, such as the possibility of discrimin- atory bias or lack of system accuracy.

Also, some developers may train systems on data obtained either illegally or through unethical methods.

This is particularly worrisome when users of such platforms or services are members of vulnerable groups.

Risk assessments that go beyond traditional data protection and cover a wider range of interests, ethical standards and rights (such as the right to non-discrimination) 109 are of great importance.

Societal interests and ethics are broader than law, and organizations should consider the wider contextual background, including political and cultural nuances.

This makes evaluating ethical values more complex, context- dependent and comprehensive than assessing compliance with data protection laws alone.

There have been numerous attempts to de fi ne the ethical principles that apply to the development of Arti fi cial Intelligence.

Examples include the Asilomar Arti fi cial Intelligence Principles 110 and the International Conference of Data Protection and Privacy Commissioners ’ Declaration on Ethics and Data Protection in Arti fi cial Intelligence . 111 Academics are also conducting research into ethical issues related to Arti fi cial Intelligence, 112 and some multinational companies are developing their own sets of ethical principles. 113 108 Mantelero, Beyond Data Human Rights, Ethical and Social Impact Assessment in AI . 109 Ibid., chap. 2. 110 Future of Life Institute, “ Asilomar AI Principles ” : https://futureo fl ife.org/ai-principles. 111 International Conference on Data Protection and Privacy Commissioners, Declaration on Ethics and Data Protection in Arti fi cial Intelligence , Declaration, 40th International Conference of Data Protection and Privacy Commissioners, Brussels, Belgium, 23 October 2018: http://globalprivacyassembly.org/ wp-content/uploads/2018/10/20180922_ICDPPC-40th_AI-Declaration_ADOPTED.pdf. 112 See for example the ACM conference on Fairness, Accountability and Transparency (fatconference.org), which has gained prominence in recent years. 113 Marcello Ienca and Effy Vayena, “ AI ethics guidelines: European and global perspectives ” , in Towards Regulation of AI Systems: Global Perspectives on the Development of a Legal Framework on Arti fi cial Intelligence Systems Based on the Council of Europe ’ s Standards on Human Rights, Democracy and the Rule of Law , by Isaac Ben Israel et al., Council of Europe (CoE), 2020, 38 – 60: https://edoc.coe.int/en/arti fi cial-intelligence/9656-towards-regulation-of-ai-systems.html; Thilo Hagendorff, “ The ethics of AI ethics: An evaluation of guidelines ” , Minds and Machines , Vol. 30, No. 1, 1 March 2020, pp. 99 – 120: https://doi.org/10.1007/s11023 – 020-09517-8. 330 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of However, ethical assessment, like social assessment, is more complicated than that of Data Protection and Human Rights Impact Assessment.

Whereas the latter refer to a well-de fi ned benchmark, the ethical framework involves a variety of theoretical inputs on the underlying values, as well as a proliferation of guidelines, in some cases partially affected by “ ethics washing ” or re fl ecting corporate values.

Experts therefore play a crucial role in detecting, contextualizing and evaluating Arti fi cial Intelligence solutions against existing ethical and social values.

Much more than in the human rights assessment, experts are decisive in grasping the relevant community values, given their context-speci fi c nature and, in many cases, the need for active interaction with rights-holders and stakeholders to better understand them.

Given the impact Arti fi cial Intelligence can have, ethics committees are attracting increasing attention in Arti fi cial Intelligence circles as they can provide valuable support to developers in designing rights-based and socially oriented algorithms. 114 In terms of the composition of such committees, where societal issues are signi fi cant, legal, ethical or sociological expertise, as well as domain-speci fi c knowledge, will be essential.

Humanitarian Organizations could therefore consider establishing an ethics committee to assist them in dealing with such issues when deploying Arti fi cial Intelligence solutions.

To ensure compliance with legal and ethical standards, Humanitarian Organizations should consider the following two steps: • First, they should answer the following three questions: 1.

What should actually be done? 2.

What is legally allowed? 3.

What is technically possible? • Second, when choosing to use new technologies, they should consider the prob- lem they are facing and whether Arti fi cial Intelligence can help solve it by asking the questions below: ○ What problem is solved with Arti fi cial Intelligence? ○ What problem is not solved? ○ What problem is created? ○ How does this technology perform compared with other technologies that may be less risky? In this respect, ethical assessment also has an in fl uence on the design of Arti fi cial Intelligence solutions, especially with regard to acceptability of the proposed Arti fi cial Intelligence solution.

This assessment not only examines the Arti fi cial Intelligence product/service itself but looks at a wider range of alternative 114 Council of Europe (CoE), Arti fi cial Intelligence and Data Protection: Challenges and Possible Remedies | T-PD(2018)09Rev , 16. 17 ARTIFICIAL INTELLIGENCE 331 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of possibilities to meet identi fi ed needs, also considering solutions that are not neces- sarily based on Arti fi cial Intelligence.

In this regard, the zero option (not using Arti fi cial Intelligence) should always be kept in mind.

This is particularly relevant where the use of Arti fi cial Intelligence would be legal but not ethically acceptable.

For instance, if the solution chosen by the organ- ization is not well accepted by the intended bene fi ciaries of the programme, this feeling of discomfort or distrust may justify a decision not to implement the technology. 332 II SPECIFIC PROCESSING SITUATIONS, TECHNOLOGIES AND TECHNOLOGY AREAS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of APPENDIX 1 TEMPLATE FOR A DPIA REPORT use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of COVER PAGE • Data Protection Impact Assessment on [name of activity] • Contact person, title and email address • Date EXECUTIVE SUMMARY If the DPIA is more than 20 pages, it should include an executive summary.

The executive summary should include details of why the DPIA was undertaken, for whom and who conducted it.

The executive summary should include the key fi ndings and principal recommendations.

INTRODUCTION AND OVERVIEW OF THE DPIA PROCESS The introduction should outline the scope of the DPIA, when, why and for whom it was performed and by whom.

It should provide some information about the activity assessed.

It should introduce the methodology employed in the DPIA (e.g. the method chosen to engage stakeholders).

THRESHOLD ASSESSMENT This section should list the questions addressed by the Humanitarian Organization to determine whether a DPIA was necessary and what should be the scale of the DPIA.

DESCRIPTION OF THE ACTIVITY OR PROJECT TO BE ASSESSED The description of the activity to be assessed should state who is undertaking the activity and when it is to be undertaken.

It should state who will be affected by the activity, and who might be interested in or affected by the activity.

The description should provide contextual information about how the activity fi ts in with the Humanitarian Organization ’ s other services or activities.

INFORMATION FLOWS This section should detail (at a minimum): • the type of data to be collected; • whether sensitive information will be collected; 334 APPENDIX 1 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of • how the data will be collected; • for what purposes the data will be used; • how and where the data will be stored and/or backed up; • who will have access to the Personal Data; • whether Personal Data will be disclosed; • whether sensitive Personal Data will be disclosed; • whether any data will be transferred to other organizations or countries.

COMPLIANCE WITH LAWS, REGULATIONS, CODES AND GUIDELINES The DPIA report should identify the laws, regulations, codes of conduct and guide- lines with which the activity complies or should comply.

At the global level, the privacy principles listed in the ISO/IEC 29100:2011 standard of the International Organization for Standardization (ISO) 1 are useful as a reference in a DPIA.

In addition, the DPIA report should state how it complies with the Humanitarian Organization ’ s con fi dentiality rules and codes of conduct, and how the Humanitarian Organization monitors compliance.

STAKEHOLDER ANALYSIS The report should identify who are the principal stakeholders interested in or affected by the data Processing and how the DPIA or the Humanitarian Organization arrived at this list.

DATA PROTECTION IMPACTS (RISKS) This section should detail the privacy risks identi fi ed in relation to the main privacy principles found in relevant legislation and the Humanitarian Organization ’ s con fi - dentiality rules and codes of conduct.

RISK ASSESSMENT This section of the report should include details of how the risks were assessed and the results of any risk assessment undertaken. 1 International Organization for Standardization (ISO), “ ISO/IEC 29100:2011 | Information Technology – Security Techniques – Privacy Framework, ” 2017, www.iso.org/standard/45123.html.

APPENDIX 1 335 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of ORGANIZATIONAL ISSUES The DPIA report should include a section that describes how senior management is involved in decision making related to data protection.

This should include discussion identifying any organizational issues that are directly or indirectly affected by the data Processing activity.

For example, it may become apparent that the data Processing requires putting in place an organizational mechanism for ensuring accountability, i.e. that a senior manager is responsible for ensuring that the programme does not negatively affect the Humanitarian Organization or its stakeholders.

In the course of the DPIA, it may become apparent to the DPIA team that the Humanitarian Organization needs to spend more time on raising the awareness of employees about privacy and/or ethical issues, and that the Humanitarian Organization needs to mainstream data protection in the organization.

The report should state what the Humanitarian Organization does now to raise employee awareness of data protection and how it could improve.

The report should state how the Humanitarian Organization identi fi es, investigates and responds to data protection incidents, e.g. data protection breaches, how the Humanitarian Organization decides to notify affected parties and how it seeks to learn from an incident.

This section should also describe how the Humanitarian Organization responds to requests for access to personal information or to correct or amend the information it has gathered and to whom the data are transferred and what safeguards the Humanitarian Organization insists be in place before making a transfer.

RESULTS OF THE CONSULTATION(S) The report should specify what efforts the Humanitarian Organization has made to consult with stakeholders, to gather their views and ideas about potential data protection impacts, how they might be affected by the data Processing (positively and/or negatively) and how negative impacts could be mitigated, avoided, minim- ized, eliminated, transferred or accepted.

The DPIA team should specify which consultation techniques were employed (surveys, interviews, focus groups, workshops, etc.), when they were undertaken, the results of each consultation exercise and whether differences in opinion were discovered when different techniques were used.

The DPIA should state who was consulted and what information materials the Humanitarian Organization provided to stakeholders, including families of the missing. 336 APPENDIX 1 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of The DPIA should state whether the consultations yielded any new fi ndings and what efforts the Humanitarian Organization had made to take into account stakeholder views and ideas in the design of the data Processing activity.

RECOMMENDATIONS The DPIA team should set out their recommendations for avoiding, minimizing, transferring or sharing the data protection risks.

Some risks may be worth taking and, if so, the DPIA should say why.

The DPIA should be clear who will bear the risk (i.e. will it be the Humanitarian Organization or stakeholders or others?).

The DPIA should also set out what further work is necessary or desirable to implement its recommendations (for example, the DPIA should mention the need for independent Third Party monitoring of its recommendations.

The DPIA should also make recommendations as to whether the DPIA report should be made public.

There may be circumstances where it might not be appropriate to make the DPIA or parts of it public – e.g. there may be con fi dentiality or security reasons.

Often the report can be redacted in places and then made public or sensitive parts can be placed in a con fi dential appendix.

Alternatively, the Humanitarian Organization could provide a summary of the DPIA report.

APPENDIX 1 337 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of APPENDIX 2 WORKSHOP PARTICIPANTS use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of All workshops were co-organized by the Brussels Privacy Hub and the ICRC.

Workshop participants included representatives of the following organizations: • Barclays; • Belgian Privacy Commission; • Biometrics Institute; • Brussels Privacy Hub; • Canadian Red Cross; • Cash Learning; • Council of Europe; • Council of the EU; • Dalberg Data Insights; • EFTA Surveillance Authority; • Engine Room; • European Commission, DG ECHO; • European Commission, DG Justice; • European Data Protection Supervisor; • European UAV-Drones Area; • Facebook; • Fairphone; • French Data Protection Authority; • French-speaking Association of Personal Data Protection Authorities; • Government of Luxembourg; • GSMA; • Harvard Humanitarian Initiative; • Human Rights Watch; • ID2020; • International Committee of the Red Cross; • International Federation of the Red Cross; • International Organization for Migration; • ITU; • KU Leuven; • MasterCard; • Médecins Sans Frontières; • Mercy Corps; • Microsoft; • MIT; • Netherlands Red Cross; • Norwegian Red Cross; • Orange Business Services; • Oxford University; • Politecnico di Torino; • Privacy International; • Queen Mary University of London; 340 APPENDIX 2 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of • Royal Military Academy Belgium; • Ryerson University – Privacy by Design Centre of Excellence; • Sensometrix; • SES; • Spanish Data Protection Agency; • Swiss Data Protection Authority; • Swiss Federal Institute of Technology in Lausanne; • UN Global Pulse; • UN Of fi ce of the Special Rapporteur on the Right to Privacy; • United Nations High Commissioner for Refugees; • United Nations Of fi ce for the Coordination of Humanitarian Affairs; • University of Geneva; • USAID; • VIVES University College; • Vrije Universiteit Brussel; • World Food Programme; • World Vision International; • Yale University.

APPENDIX 2 341 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of INDEX Footnotes are indicated by n. after the page number, and fi gures by fi g. access right, 15, 38 – 40, 107 – 108, 158, 225 – 226, 266 accountability principle, 35, 60, 63, 151 – 152, 319 – 320 accuracy of data.

See quality of data adequacy fi ndings, 61 administrative activities, data processing for, 28, 305 AI.

See arti fi cial intelligence anonymization and pseudonymization for arti fi cial intelligence use, 297, 301 – 302, 315 before further processing, 24 blockchain tools as pseudonymized personal data, 251 – 252, 261 cash and voucher assistance bene fi ciaries ’ data, 139 – 140 de fi nitions, 18 – 20, 52n.12 dimensionality problem, 85 for drone-collected data processing, 105 re-identi fi cation risk, 19 – 20, 71 – 72, 139 – 140, 297, 301 – 302 anonymous use of mobile messaging apps, 202 – 203 applicable law.

See also international data sharing applicable law, 20 – 21 arti fi cial intelligence anonymized data, re-identi fi cation using, 297, 301 – 302 bene fi ts and applications, 219 – 220, 293, 294 – 295, 298 bias problem, 296, 300 – 301, 309 – 311, 314, 316 – 318 ethical assessment, 329 – 332 HRIA (human rights impact assessment), 324 – 329 data controller/data processor relationship, 299, 319 – 321 data minimization principle, 295, 301, 312 – 314 data protection by design and by default, 329 data subjects ’ rights, 309 – 311, 316 – 319 datasets used by applications, 296, 298 – 299, 320 de fi nition and functionality, 290 – 292 DPIAs (data protection impact assessments) for, 296 – 297, 320, 322 – 324 international data sharing, 320 – 322 introduction to topic, 290 legal bases for personal data processing, 302 – 305, 308 – 309, 318 purpose limitation principle and further processing, 296 – 297, 304, 305 – 308, 322 retention of data, 314 – 315 risks and challenges, 292 – 303 securitizing data, 315 – 316 social media data analysis using, 232 – 233, 235, 237, 298, 303 – 306 transparency principle, 304, 308 – 309, 311 – 312, 318 authenticating identities.

See identity veri fi cation backup procedures, 32 balancing of data rights and other interests con fi dentiality protection, 15, 39 in emergency situations, 14 – 15, 17 – 18, 35, 44, 49 historical record protection, 15, 26, 40 – 41 human rights protection, 14 – 15, 54, 282 proportionality principle, 14, 24 – 26, 122 – 123, 227 – 228, 264 bias problem of arti fi cial intelligence.

See under arti fi cial intelligence Big Brother Watch case, 177 – 178 biometrics.

See also identity veri fi cation bene fi ts and applications, 114 – 116 data controller/data processor relationship, 126 data minimization principle, 122 – 123, 227 data subjects ’ rights, 124 – 125 DPIAs (data protection impact assessments) for, 117 – 118, 120, 125 – 126 fair and lawful use principle, 120 – 121 generally, 114 legal bases for biometric data processing, 118 – 120, 124 purpose limitation principle and further processing, 121 – 122, 123 retention of data, 123 risks and challenges, 115, 116, 117 – 118 securitizing data, 123 – 124 sharing data, 125 – 126 special protection requirements for data, 116 – 118, 124 types, 115 blockchain applications in humanitarian sector, 219, 256 – 258, 267 bene fi ts, 250, 252 – 253, 255 data controller/data processor relationship, 261 – 263 data minimization principle, 263 – 264 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of blockchain (cont.) data protection by design and by default, 260 – 261, 271 – 272 data subjects ’ rights, 265 – 268 decision-making framework for deployment, 269 – 272 de fi nition and functionality, 250 – 253 DPIAs (data protection impact assessments) for, 258 – 260, 271 international data sharing, 268 – 269 proportionality principle, 264 retention of data, 264 risks and challenges, 255 – 256 securitizing data, 264 – 265 types, 253 – 255 ‘ by design ’ approach.

See data protection by design cash and voucher assistance bene fi ciaries, identity veri fi cation, 115 bene fi ts, 131 blockchain technology for, 256, 257, 258, 267 data controller/data processor relationship, 143 data minimization principle, 139 – 140 data subjects ’ rights, 141 DPIAs (data protection impact assessments) for, 139, 140, 141, 143 – 144 generally, 130 – 131 legal bases for bene fi ciaries ’ data processing, 136 – 137 personal data collected and generated via, 132 – 135 purpose limitation principle and further processing, 137 – 139 retention of data, 140 risks and challenges, 131 – 134, 256 securitizing data, 140 – 141 sharing data, 141 – 143 checklists for data protection compliance, 15 – 16, 26 – 27 children, 45 – 48, 294 – 295 CISCO Tactical Operations, 278 CLOUD Act (US), 178 – 181, 186 cloud services bene fi ts and applications, 148 blockchain applications supported by, 264 data controller/data processor relationship, 151 – 152, 154 – 158, 166 – 167 de fi nition, service models and infrastructure, 148, 149 – 151 deletion of data, 150, 155 – 156, 157, 161 DPIAs (data protection impact assessments) for, 152, 153, 156, 165 – 166 fair and lawful use principle, 153 GDPR codes of conduct, 167 – 168 government access to data.

See cloud-based data, government access as international data sharing, 58, 165 legal bases for personal data processing, 152 – 153 privileges and immunities, implications for, 149, 152, 157, 160 – 161, 166 – 167, 186 – 189 purpose limitation principle and further processing, 153 – 154, 159 risks and challenges, 148 – 149 securitizing data.

See cloud services, data security transparency principle, 154 – 155 cloud services, data security asset protection, 160 – 162 audits and procedures for, 164 – 165 data in transit protection, 160 data subjects ’ rights and, 158 – 160, 165 during development, 163 governance of, 162 identity veri fi cation, 164 operational security, 162 – 163 particular vulnerabilities, 164 privileged data, technical security measures, 167 responsibilities for, 156 – 158, 163 – 164 risks related to infrastructure types, 150 – 151 separation between users, 162 staff selection and training, 163, 164 – 165, 167 supply chain security, 163 cloud-based data, government access criminal investigation grounds, 178 – 184 impacts on aid bene fi ciaries, 184 impacts on humanitarian organizations, 184 – 186 introduction to topic, 172 – 173 legal duties generally, 173 – 174 national security grounds, 174 – 178 risk mitigation, 186 – 189 community identi fi able information, 8 compliance with legal obligation (legal basis), 53 – 57, 284 computer security measures.

See also cloud services, data security computer security measures, 31 – 32, 34, 51 – 52 con fi dentiality duties cloud service providers, 157, 159, 181 contractual duties, 31, 32 – 33 data rights balanced against, 15, 39 in emergency situations, 17 – 18 health data processing, 27 – 28, 54, 89 – 90, 184 identity veri fi cation before information disclosure, 39 – 40, 216 levels of con fi dentiality, attribution of, 33 con fi rmation right, 39, 49 connectivity as aid programmes data controller/data processor relationship, 282 – 283 DPIAs (data protection impact assessments) for, 279, 281 – 282 344 INDEX use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of examples, 277 – 278 international data sharing, 287 introduction to topic, 276 – 277 legal bases for personal data processing, 283 – 284 operational context, 278 – 279 retention of data, 286 securitizing data, 284 – 286 stakeholder partnerships for, 279 – 281 transparency principle, 286 – 287 consent (legal basis).

See also information right for arti fi cial intelligence use, 302 – 304, 308 – 309, 318 for biometric data processing, 118 – 120, 124 of cash and voucher assistance bene fi ciaries, 136 – 137, 258 of children, 45 – 48 of connectivity as aid bene fi ciaries, 283 – 284 for digital identity data processing, 225, 226 – 227 documentation of, 48 for drone-collected data processing, 102, 107 freely given, 46 information requirements for, 36 – 37, 46, 48 for international data sharing, 60 for mobile messaging app data processing, 203, 206 for social media data processing, 244 – 245 objection right, 40, 41, 44 – 45, 48 – 49, 107 timing of, 46 transmission methods and modes, 46, 48 of vulnerable adults, 45 – 47 when not required, 44, 45 – 46, 49 withdrawal of, 40, 49, 304 contact tracing apps.

See also mobile messaging apps data minimization principle, 93 DP3T protocol design, 81 – 82, 91 – 92 generally, 79 – 81 risks and challenges, 84 – 86, 88, 89 – 90, 92 – 93, 95 contingency planning, 33 contracts for data processing.

See data controller/data processor relationship contractual performance (legal basis), 52 – 53, 60, 284 correction right, 40, 207 – 208, 226, 266 – 267, 318 counter-terrorist legislation.

See cloud-based data, government access COVID-19 pandemic combating misinformation during, 234 contact tracing apps used in.

See contact tracing apps criminal investigation legislation, 178 – 184 cross-border data sharing.

See international data sharing cross-functional needs assessments, 25 crowdsourcing, 108 – 109 data analytics.

See arti fi cial intelligence data controller/data processor relationship arti fi cial intelligence use, 299, 319 – 321 biometric data processing, 126 blockchain use, 261 – 263 cash and voucher bene fi ciaries ’ data processing, 143 cloud services-held data processing, 151 – 152, 154 – 158, 166 – 167 connectivity as aid programmes, 282 – 283 digital identity management systems, 223 – 224 drone-collected data processing, 109 – 110 social media data processing, 243 – 244 data controllers accountability of, 35, 60, 63, 151 – 152, 319 – 320 data processors, distinguished from, 18, 261 data processors, relationship with.

See data controller/data processor relationship data security obligations.

See data security data sharing by.

See data sharing; international data sharing data minimization principle.

See also deletion of data; retention of data arti fi cial intelligence use, 295, 301, 312 – 314 biometric data, 122 – 123, 227 blockchain use, 263 – 264 cash and voucher assistance, 139 – 140 cloud-based data, 155 for data protection by design, 93 – 94 digital identity management systems, 216 – 217, 227 – 228 drone-collected data, 105 – 106 generally, 25, 26 – 27 mobile messaging app data, 207, 208 – 209 data processing principles accountability, 35, 60, 63, 151 – 152, 319 – 320 data minimization.

See data minimization principle data quality.

See quality of data ‘ do no harm ’ (precautionary principle), 24, 35, 69 – 70 fair and lawful use, 21 – 22, 120 – 121, 153, 308 – 311 proportionality, 14, 24 – 26, 122 – 123, 227, 264 purpose limitation.

See purpose limitation principle transparency.

See information right data processors con fi dentiality duties.

See con fi dentiality duties data controllers, distinguished from, 18, 261 data controllers, relationship with.

See data controller/data processor relationship international data sharing by, 58, 63 – 65 sub-processors, 18, 124, 151, 157 – 158, 188 INDEX 345 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of data protection by design arti fi cial intelligence systems, 329 blockchain applications, 260 – 261, 271 – 272 case study.

See contact tracing apps cash and voucher assistance systems, 140 – 141 data collected centrally, 93 – 94, fi g.6.1 data minimization principle, 93 – 94 design assessment process potential risks identi fi cation, 88 – 90 risks assessment, 90 – 93 digital identity management systems, 222 – 223 generally, 78 – 79 mobile messaging apps, 210 – 211 purpose limitation principle purposes determination, 87, 88 rationale, 82 – 87 technical challenges, 94 – 97 risks retention, 87 – 88, fi g.6.2, 94 – 95 ‘ system ’ de fi nition, 79 data protection impact assessments.

See DPIAs (data protection impact assessments) data quality.

See quality of data data retention or deletion.

See deletion of data; retention of data data security anonymization and pseudonymization.

See anonymization and pseudonymization arti fi cial intelligence applications, 315 – 316 biometric data, 123 – 124 blockchain-stored data, 264 – 265 cash and voucher assistance bene fi ciaries ’ data, 140 – 141 cloud-based data.

See cloud services, data security for connectivity as aid programmes, 284 – 286 contingency planning, 33 data controllers ’ general duties, 29 – 31 deletion of data.

See deletion of data by design.

See data protection by design digital identity data, 228 – 229 drone-collected data, 106 internal organization measures, 34 – 35 international data sharing, risk mitigation, 61 – 63 IT security, 31 – 32, 34, 51 – 52 mobile messaging app data, 202 – 205 physical security, 31 social media data, 247 data security of fi cers, 34 – 35 data sharing.

See also international data sharing anonymized or pseudonymized data, 18 – 20 biometric data, 125 – 126 cash and voucher assistance bene fi ciaries ’ data, 141 – 143 with cloud service providers, 159 – 160 digital identity data, 220 – 221 drone-collected data, 108 – 109 generally, 41 – 43 with government authorities.

See government access to personal data with humanitarian organizations without privileges or immunities, 54 – 57 information right, 42 mobile messaging app data, 199 – 200, 204 – 205 by social media platforms, 211, 236 – 238, 247 with third parties.

See third parties data subjects ’ rights.

See also human rights access, 15, 38 – 40, 107 – 108, 158, 225, 266 arti fi cial intelligence use and, 309 – 311, 316 – 319 balanced against other interests.

See balancing of data rights and other interests blockchain applications and, 265 – 268 claims for breach of, 38 cloud services and, 158 – 160, 165 con fi dentiality.

See con fi dentiality duties correction, 40, 207 – 208, 226, 266, 318 digital identity management systems and, 224 – 226 erasure, 40 – 41, 155 – 156, 207 – 208, 226, 267, 318 information.

See information right objection, 40, 41, 44 – 45, 48 – 49, 107 deceased persons, 8, 39, 49 deletion of data.

See also data minimization principle; retention of data biometric data, 123 cash and voucher assistance bene fi ciaries ’ data, 140 cloud-based data, 150, 155 – 156, 157, 161 drone-collected data, 106 erasure right, 40 – 41, 155 – 156, 207 – 208, 226, 267, 318 inaccurate data, 27 mobile messaging app data, 201, 203 – 204, 207 – 208 paper records destruction, 33 – 34 from portable media equipment, 32, 34 social media data, 246 by third parties, 29, 32, 34, 140 demographically identi fi able information, 8 designing systems for data protection.

See data protection by design detained persons, 51 differential privacy, 315 – 316 digital identity management systems.

See also identity veri fi cation adoption of, 214, 218 – 219, 221 – 222 data controller/data processor relationship, 223 – 224 data minimization principle, 216 – 217, 227 – 228 data subjects ’ rights, 224 – 226 design of, 216 – 220, 222 – 223 DPIAs (data protection impact assessments) for, 222 346 INDEX use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of governance of, 218 international data sharing, 229 legal bases for personal data processing, 226 – 227 proportionality principle, 227 purpose limitation principle, 227 retention of data, 229 scenarios of use, 220 – 221 securitizing data, 228 terminology, 214n.4, 215, 217 digital systems for data protection.

See data protection by design digitization of paper records, 33 – 34 disasters.

See emergency situations discretion, duties of.

See con fi dentiality duties disease prevention, 234, 295 ‘ do no harm ’ (precautionary principle), 24, 35, 69 – 70 DPIAs (data protection impact assessments) for arti fi cial intelligence use, 296 – 297, 320, 322 – 324 for biometric data processing, 117 – 118, 120, 125 – 126 for blockchain use, 258 – 260, 271 for cash and voucher assistance, 138 – 139, 140, 141, 143 – 144 for cloud services use, 152, 153, 156, 165 – 166 for connectivity as aid programmes, 279, 281 – 282 for digital identity management systems, 222 DPIA report template, 333 – 337 for drone operations, 110 for mobile messaging apps use, 196, 206 process.

See DPIA process for social media use, 239 – 241, 247 when appropriate, 45, 63, 66 – 67, 72 – 73 DPIA process (1) determining necessity for DPIA, 67 (2) assembling DPIA team, 67 – 68 (3) describing the processing of personal data, 68 (4) consulting stakeholders, 68 – 69 (5) identifying risks, 69 (6) assessing risks, 69 – 70 (7) identifying solutions, 70 – 72 (8) proposing recommendations, 72 (9) implementing recommendations, 72 – 73 (10) providing expert review or audit of DPIA, 73 (11) updating the DPIA, 73 drones/UAVs and remote sensing data collection and processing equipment, 98, 100 data minimization principle, 105 – 106 data subjects ’ rights, 106 – 108 DPIAs (data protection impact assessments) for, 110 generally, 100 – 101 humanitarian action uses, 98 – 99 legal bases for drone-collected data processing, 102 – 104, 107 outsourced operations, 101, 109 – 110 purpose limitation principle, 105 retention of data, 106 safety risks, 99 – 100, 101 securitizing data, 106 sharing of data, 108 – 109 transparency principle, 104 – 107 e-evidence legislation, 183 – 184 email correspondence, 31 emergency situations balancing of data rights and other interests in, 14 – 15, 17 – 18, 35, 44, 49 connectivity loss.

See connectivity as aid programmes drone-collected data processing in, 103 presumption of high risk in, 69 – 70 social media use in, 233, 241 vital interests in.

See vital interests (legal basis) Emergency Telecommunications Cluster, 277 erasure right, 40 – 41, 155 – 156, 207 – 208, 226, 267, 318 EU law on data controllership, 243 – 244 GDPR (General Data Protection Regulation), 6, 78n.1, 117, 167 – 168, 307 on government access to cloud-based data, 176 – 177, 183 Facebook data collection and retention by, 236, 246 as data controller, 243 – 244 data sharing by, 204, 237 – 238 Facebook Connectivity initiative, 278 Messenger and WhatsApp services.

See mobile messaging apps facial recognition, 100, 105, 294 – 295, 299, 300 – 301, 315 fair and lawful use principle, 21 – 22, 120 – 121, 153, 308 – 311 family members, data access right, 39 – 40 fundamental rights.

See human rights further processing.

See also purpose limitation principle arti fi cial intelligence use for, 304, 306 – 308 of biometrics data, 121 – 122, 123 of cash and voucher assistance bene fi ciaries ’ data, 138 – 139 of cloud-based data, 153 – 154, 159 of drone-collected data, 105 generally, 22 – 24 of mobile messaging app data, 193, 209, 210 GDPR (EU General Data Protection Regulation), 6, 78n.1, 117, 167 – 168, 307 Global Privacy Assembly, 4 – 5 INDEX 347 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of government access to personal data cloud-based data.

See cloud-based data, government access compliance with legal obligation (legal basis), 53 – 55, 284 mobile messaging app data, 197, 200, 201 – 202, 204 smartphone surveillance, 284 – 285 social media data, 232 – 233, 238 – 239, 240, 298 health data processing, 27 – 28, 54, 89 – 90, 184 health promotion, 234, 295 historical record-keeping, 15, 26, 40 – 41 human rights.

See also data subjects ’ rights arti fi cial intelligence, bias problem, 296, 300 – 301, 309 – 311, 314, 316 – 318 ethical assessment, 329 – 332 HRIA (human rights impact assessment), 324 – 329 data protection as human right, 7 data rights balanced against, 14 – 15, 54, 282 humanitarian emergencies.

See emergency situations humanitarian organizations.

See also data controllers campaigning and fundraising by, 232, 235 – 236, 244 – 245, 257 compelled data disclosure, impacts on, 184 – 186 legitimate interests of.

See legitimate interest (legal basis) NGOs (non-governmental organizations), 18, 20 – 21, 277 – 278 staff of.

See staff of humanitarian organizations with privileges and immunities.

See privileges and immunities ICRC (International Committee of the Red Cross), 7, 50n.8, 189n.52, 233, 241n.46 ID2020 Alliance, 224 identity veri fi cation biometrics.

See biometrics cash and voucher assistance bene fi ciaries, 115 for cloud services access, 164 digital systems for.

See digital identity management systems facial recognition, 100, 105, 294 – 295, 299, 300 – 301, 315 general duties of, 39 – 41, 216 KYC (know your customer) obligations, 137, 142, 144, 221 – 222 ‘ legal identity ’ de fi nition, 214n.4, 215 purpose creep risk, 86, 222 for SIM card registration, 134, 137, 142, 198, 221, 280 social media data used for, 232 – 233 immunities.

See privileges and immunities impact assessments.

See DPIAs (data protection impact assessments) important grounds of public interest.

See public interest (legal basis) inaccurate data.

See quality of data inferred data.

See non-personal data, inferences from information right arti fi cial intelligence use, 304, 308 – 309, 311 – 312, 318 balanced against other interests, 14 – 15, 35 biometric data processing, 124 of cash or voucher assistance bene fi ciaries, 141 cloud-based data processing, 154 con fi rmation of data processing, 39, 49 of connectivity as aid programme bene fi ciaries, 286 – 287 data sharing, right to be informed, 42, 60 digital identity data processing, 225 drone-collected data processing, 104, 106 – 107 personal data obtained from data subjects, 36 – 37, 46, 48 personal data obtained from third parties, 37 – 38 social media data processing, 245 – 246 transmission methods and modes, 35, 39, 49 – 50, 107 integrity of data.

See quality of data International Committee of the Red Cross (ICRC), 6 – 7, 50n.8, 189n.52, 233, 241n.46 international data protection standards, 5 – 7, 21, 58 international data sharing.

See also data sharing arti fi cial intelligence use, 320 – 322 basic rules, 59 – 60 biometric data, 125 – 126 blockchain-stored data, 268 – 269 cash and voucher assistance bene fi ciaries ’ data, 142 – 143 cloud services as, 58, 165 connectivity as aid programmes and, 287 contractual arrangements for, 61 – 65 de fi nition and scenarios, 41 – 42, 59 digital identity data, 229 drone-collected data, 109 entities engaging in, 58 – 59 legal bases for, 60 – 61 mobile messaging app data, 211 reasons for, 58 risk mitigation, 61 – 63 by social media platforms, 211, 236 – 238, 247 US/UK agreement on electronic data exchange, 180 – 183, 188 internet connectivity.

See connectivity as aid programmes IT security measures.

See also cloud services, data security IT security measures, 31 – 32, 34, 51 – 52 348 INDEX use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of KYC (know your customer) obligations, 137, 142, 144, 221 – 222 legal bases for international data sharing, 60 – 61 legal bases for personal data processing alternatives to consent, when permitted, 44, 45 – 46, 49 arti fi cial intelligence use, 302 – 305, 308 – 309, 318 biometric data processing, 118 – 120, 124 cash and voucher assistance bene fi ciaries ’ data processing, 136 – 137 cloud-based data processing, 152 – 153 compliance with legal obligation, 53 – 57, 284 connectivity as aid programmes, 283 – 284 consent.

See consent (legal basis) digital identity data processing, 226 – 227 drone-collected data processing, 102 – 104, 107 legitimate interest.

See legitimate interest (legal basis) list of, 36, 44 mobile messaging app data processing, 206 – 207 performance of a contract, 52 – 53, 60, 284 public interest, important grounds of.

See public interest (legal basis) social media data, 244 – 245 vital interests of individuals.

See vital interests (legal basis) legal risk assessment.

See DPIAs (data protection impact assessments) legitimate interest (legal basis) for arti fi cial intelligence use, 305 for biometric data processing, 120 for cash and voucher assistance bene fi ciaries ’ data processing, 137 for connectivity as aid programmes, 284 for drone-collected data processing, 104 generally, 51 – 52 for international data sharing, 60 machine learning.

See arti fi cial intelligence medical data processing, 27 – 28, 54, 89 – 90, 184 metadata of cash and voucher assistance bene fi ciaries, 131 – 135, 136, 137, 138 – 139, 142 cloud-based metadata.

See cloud-based data, government access connectivity as aid programmes collecting, 280, 284 – 286 drone-collected, 100 on mobile messaging apps, 193, 198 – 201, 203 on social media networks, 232, 240 missing persons, 39 – 40, 49, 294 – 295, 298, 299, 300 – 301 mobile messaging apps.

See also contact tracing apps; social media bene fi ts and applications, 192, 193, 194 – 195 data minimization principle, 207, 208 – 209 data protection by design, 210 – 211 data subjects ’ rights, 207 – 208 data types collected and stored, 197 – 200 de fi nition and functionality, 194, 197 deletion of data, 201, 203, 207 – 208 DPIAs (data protection impact assessments) for, 196, 206 international data sharing, 211 legal bases for personal data processing, 206 – 207 managing, analysing and verifying data, 209 – 210 purpose limitation principle and further processing, 193, 209, 210 risks and challenges, 192 – 194, 196 – 197 securitizing data, 202 – 205 third party data access routes, 199 – 202 White fl ag Protocol, 257 – 258 mobile network connectivity.

See connectivity as aid programmes national security legislation, 174 – 178 ‘ necessary ’ data processing, 25, 26 – 27, 50 – 53 NGOs (non-governmental organizations), 18, 20 – 21, 277 non-personal data, inferences from anonymized data, re-identi fi cation risk, 19 – 20, 71 – 72, 139 – 140, 297, 301 – 302 generally, 17 – 18, 54, 297 social media data, 235, 241 – 242, 305 – 306 objection right, 40, 41, 44 – 45, 48 – 49, 107 once-only principle, 220 outsourced data processing.

See data controller/data processor relationship overriding interests.

See balancing of data rights and other interests paper records destruction, 33 – 34 passwords, 32 PATRIOT Act (US), 175 – 176, 177 performance of a contract (legal basis), 52 – 53, 60, 284 personal data processing anonymization and pseudonymization.

See anonymization and pseudonymization de fi nition, 16 – 17 DPIA description of, 68 further processing.

See further processing for identity veri fi cation.

See identity veri fi cation legal bases for.

See legal bases for personal data processing parties engaged in.

See data controllers; data processors INDEX 349 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of personal data processing (cont.) principles and rights.

See data processing principles; data subjects ’ rights risk mitigation.

See data security; DPIAs (data protection impact assessments) sensitive data.

See sensitive data sharing of data.

See data sharing; international data sharing staff members ’ data, 28, 53 perturbing/redacting data, 20, 39, 72 physical security of data, 31 portable media equipment, 32, 34 precautionary principle ( ‘ do no harm ’ ), 24, 35, 69 – 70 principles of data protection.

See data processing principles prisoners, 51 privacy right.

See also con fi dentiality duties privacy right, 7 privacy-enhancing technologies.

See data protection by design privileges and immunities cash and voucher assistance provision and, 142, 143 cloud services use and, 149, 152, 157, 160 – 161, 166 – 167, 186 – 189 data protection as human right transcending, 7 – 8 data sharing by protected organizations, 54 – 57 data subjects ’ claims and, 38 international data sharing and, 62 standards-setting permitted by, 21, 58 processing of personal data.

See personal data processing proportionality principle, 14, 24 – 26, 122 – 123, 227, 264 pseudonymization.

See anonymization and pseudonymization public interest (legal basis) for arti fi cial intelligence use, 304 – 305, 318 for biometric data processing, 120 for cash and voucher assistance bene fi ciaries ’ data processing, 137 for connectivity as aid programmes, 283 – 284 for drone-collected data processing, 103 – 104 generally, 44 – 45, 50 – 51 for international data sharing, 60 for mobile messaging app data processing, 206 – 207 purpose limitation principle.

See also further processing arti fi cial intelligence use, 296 – 297, 305 – 306, 322 biometric data processing, 121 by design.

See data protection by design cash and voucher bene fi ciaries ’ data processing, 137 – 138, 139 cloud-based data processing, 153 – 154, 159 digital identity data processing, 227 drone-collected data processing, 105 generally, 22 mobile messaging app data processing, 209 quality of data arti fi cial intelligence, bias problem, 296, 300 – 301, 309 – 311, 314, 316 – 318 correction right, 40, 207 – 208, 226, 266, 318 data quality principle, 27, 158 – 159 rape survivors, 184 recti fi cation right, 40, 207 – 208, 226, 266, 318 redacting/perturbing data, 20, 39, 72 re-identi fi cation risk, 19 – 20, 71 – 72, 139 – 140, 297, 301 – 302 relatives, data access right, 39 – 40 remote access to computer servers, 31 – 32 remotely piloted aircraft systems.

See drones/ UAVs and remote sensing retention of data.

See also data minimization principle; deletion of data arti fi cial intelligence use, 314 – 315 biometric data, 123 blockchain-stored data, 264 cash and voucher assistance bene fi ciaries ’ data, 140 checklist for, 26 – 27 cloud-based data, 155 – 156 from connectivity as aid programmes, 286 digital identity data, 229 drone-collected data, 106 for historical record, 15, 26, 40 – 41 initial retention period, 28 – 29 mobile messaging app data, 201, 203, 207 – 208 social media data, 246 – 247 by third parties, 34 rights.

See data subjects ’ rights; human rights risk mitigation.

See data security; DPIAs (data protection impact assessments) securitizing data.

See data security sensitive data biometric data.

See biometrics de fi nition, 17 health data, 27 – 28, 54, 89 – 90, 184 inferred from non-personal data.

See non- personal data, inferences from on portable media equipment, 32 sexual violence survivors, 184 sharing of data.

See data sharing; international data sharing SIM card registration duties, 134, 137, 142, 198, 221, 280 social media.

See also mobile messaging apps arti fi cial intelligence used to analyse, 232 – 233, 235, 237, 298, 303 – 306 bene fi ts and applications, 232, 233 – 234 connectivity as aid programmes involving providers, 279 350 INDEX use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of data controller/data processor relationship, 243 – 244 data sharing by platforms, 211, 236 – 238, 247 data types generated, 234 – 236, 240 DPIAs (data protection impact assessments) for, 239 – 241, 247 government access to data, 232 – 233, 238 – 239, 240, 298 legal bases for personal data processing, 244 – 245 retention of data, 246 – 247 risks and challenges, 232 – 233, 241 – 243 securitizing data, 247 transparency principle, 245 – 246 sought persons, 39 – 40, 49, 294 – 295, 298, 299, 300 – 301 staff of humanitarian organizations con fi dentiality duties.

See con fi dentiality duties legal action, data processing for defence purposes, 52 personal data of, 28, 53 personal data processing by.

See data processors remote access to computer servers, 31 – 32 security of, 39 statistical disclosure control process, 71 – 72 sub-processors, 18, 124, 151, 157 – 158, 188 supply chain management, 163, 257 Swiss Blocking Statute, 188 system design for data protection.

See data protection by design tax administration, 53 telecommunications connectivity.

See connectivity as aid programmes third parties cash and voucher assistance operatives.

See cash and voucher assistance cloud service providers.

See cloud services connectivity as aid programmes in partnership with, 279 – 281 deletion of data by, 29, 32, 34, 140 drone operators, 101, 109 – 110 government authorities.

See government access to personal data mobile messaging apps, third party data access, 199 – 202 personal data obtained from, 37 – 38 social media providers.

See social media sub-processors, 18, 124, 151, 157 – 158, 188 systems designers, 94 unauthorized data access by.

See data security TikTok, 234, 236, 238 transborder data sharing.

See international data sharing transparency principle.

See information right Twitter, 236, 238 UAVs (unmanned aerial vehicles).

See drones/UAVs and remote sensing UNHCR (UN High Commissioner for Refugees), 7, 245 – 246, 277, 286 – 287 United Kingdom interception of communications legislation, 176 – 178 US/UK agreement on electronic data exchange, 180 – 183, 188 United Nations connectivity initiatives, 277 data protection standards, 5 – 6, 7 privileges and immunities of, 187 United States CLOUD Act, 178 – 181, 186 US/UK agreement on electronic data exchange, 180 – 183, 188 USA PATRIOT Act, 175 – 176, 177 verifying identities.

See identity veri fi cation vital interests (legal basis) for arti fi cial intelligence use, 304 for biometric data processing, 119 – 120 for cash and voucher assistance bene fi ciaries ’ data processing, 137 for cloud-based data processing, 153 for drone-collected data processing, 103 generally, 44 – 45, 49 – 50, 51 for international data sharing, 60 for mobile messaging app data processing, 206 – 207 voucher assistance.

See cash and voucher assistance vulnerable adults, 45 – 47 WhatsApp.

See mobile messaging apps White fl ag Protocol, 257 – 258 withdrawal of consent for data processing, 40, 49, 304 World Medical Association International Code of Medical Ethics, 27 INDEX 351 use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of use, available at https://www.cambridge.org/core/terms. https://www.cambridge.org/core/product/025CE3DFD1FAD908DD1412C20E49F955 Downloaded from https://www.cambridge.org/core.

IP address: 81.191.134.126, on 20 Dec 2025 at 16:53:10, subject to the Cambridge Core terms of