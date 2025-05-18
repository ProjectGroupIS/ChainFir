import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './FireForm.css';
import axios from 'axios';
// Ensure you have dotenv installed and configured
// Import your contract ABI and addr
// Replace this with your contract's ABI and address
const contractABI = [
// Example ABI fragment for submitFIR(string)
import.meta.env.CONTRACT_ADDRESS
];

function FIRForm() {
const [isLightMode, setIsLightMode] = useState(() => {
	return localStorage.getItem('theme') === 'light';
});

useEffect(() => {
	document.body.classList.toggle('light-mode', isLightMode);
	localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}, [isLightMode]);

const [formData, setFormData] = useState({
	firNumber: '',
	policeStation: { name: '', district: '', state: '' },
	complainant: {
		fullName: '',
		parentsName: '',
		age: '',
		gender: '',
		dob: '',
		nationality: '',
		occupation: '',
		address: '',
		phoneNumber: '',
		emailAddress: ''
	},
	complainantIdProof: { idType: '', idNumber: '' },
	incidentDetails: {
		occurrenceStartTime: '',
		occurrenceEndTime: '',
		placeOfOccurrence: '',
		distanceFromStation: '',
		offenceType: '',
		description: '',
		actAndSections: ''
	},
	accusedPersons: [
		{ name: '', aliasName: '', address: '', age: '', gender: '', relationWithComplainant: '' }
	],
	witnesses: [
		{ name: '', address: '', contactInfo: '' }
	],
	evidenceDetails: {
		documents: '',
		mediaType: '',
		mediaDescription: '',
		physicalDescription: ''
	},
	investigationOfficer: {
		ioName: '',
		ioRank: '',
		ioBadgeNumber: '',
		dispatchDate: ''
	}
});

// Helpers to update nested form data
const handleSectionChange = (section, field, value) => {
	setFormData(prev => ({
		...prev,
		[section]: {
			...prev[section],
			[field]: value
		}
	}));
};

const handleAccusedChange = (index, field, value) => {
	const updated = [...formData.accusedPersons];
	updated[index][field] = value;
	setFormData(prev => ({ ...prev, accusedPersons: updated }));
};

const addAccused = () => {
	setFormData(prev => ({
		...prev,
		accusedPersons: [...prev.accusedPersons, {
			name: '', aliasName: '', address: '', age: '', gender: '', relationWithComplainant: ''
		}]
	}));
};

const removeAccused = (index) => {
	const updated = formData.accusedPersons.filter((_, i) => i !== index);
	setFormData(prev => ({ ...prev, accusedPersons: updated }));
};

const handleWitnessChange = (index, field, value) => {
	const updated = [...formData.witnesses];
	updated[index][field] = value;
	setFormData(prev => ({ ...prev, witnesses: updated }));
};

const addWitness = () => {
	setFormData(prev => ({
		...prev,
		witnesses: [...prev.witnesses, { name: '', address: '', contactInfo: '' }]
	}));
};

const removeWitness = (index) => {
	const updated = formData.witnesses.filter((_, i) => i !== index);
	setFormData(prev => ({ ...prev, witnesses: updated }));
};

// Ethereum interaction
const submitToBlockchain = async (jsonString) => {
	if (!window.ethereum) {
		alert("MetaMask is required to submit the FIR on blockchain.");
		return;
	}

	try {
		// Request account access if needed
		await window.ethereum.request({ method: 'eth_requestAccounts' });

		// Setup provider and signer
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		// Connect to contract
		const contract = new ethers.Contract(contractAddress, contractABI, signer);

		// Send transaction
		const tx = await contract.submitFIR(jsonString);
		alert('Transaction sent! Waiting for confirmation...');

		// Wait for transaction confirmation
		await tx.wait();
		alert('FIR submitted on blockchain successfully!');

	} catch (error) {
		console.error('Blockchain submit error:', error);
		alert('Failed to submit FIR on blockchain: ' + (error.message || error));
	}
};


async function uploadToPinata(data) {
try {
	const res = await axios.post(
	'https://api.pinata.cloud/pinning/pinJSONToIPFS',
	data,
	{
		headers: {
		pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
		pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
		}
	}
	);
	return res.data.IpfsHash; // This is your IPFS CID
} catch (err) {
	console.error('Error uploading to Pinata:', err);
}
}

// Form submit handler
const handleSubmit = async (e) => {
	e.preventDefault();

	// Serialize form data to JSON string for sending to smart contract
	// const jsonString = JSON.stringify(formData);

	// console.log('Submitting FIR data:', formData);
const pinataHash = await uploadToPinata(formData);
console.log('Pinata Hash:', pinataHash);
if (!pinataHash) 
	await submitToBlockchain(pinataHash);
};

return (
	<>
		<button
			type="button"
			onClick={() => setIsLightMode(prev => !prev)}
			style={{
				position: 'fixed',
				top: '16px',
				right: '16px',
				padding: '10px 16px',
				zIndex: 1000,
				backgroundColor: isLightMode ? '#007f5f' : '#00ff88',
				color: isLightMode ? '#fff' : '#121212',
				border: 'none',
				borderRadius: '6px',
				fontWeight: 'bold',
				cursor: 'pointer',
				boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)'
			}}
		>
			{isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
		</button>

		<form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: 'auto' }}>
			<h2>1. FIR Details</h2>
			<input
				type="text"
				placeholder="FIR Number"
				value={formData.firNumber}
				onChange={e => setFormData(prev => ({ ...prev, firNumber: e.target.value }))}
				required
			/>

			<h2>2. Police Station Details</h2>
			<input type="text" placeholder="Name" value={formData.policeStation.name} onChange={e => handleSectionChange('policeStation', 'name', e.target.value)} required />
			<input type="text" placeholder="District" value={formData.policeStation.district} onChange={e => handleSectionChange('policeStation', 'district', e.target.value)} required />
			<input type="text" placeholder="State" value={formData.policeStation.state} onChange={e => handleSectionChange('policeStation', 'state', e.target.value)} required />

			<h2>3. Complainant Details</h2>
			<input type="text" placeholder="Full Name" value={formData.complainant.fullName} onChange={e => handleSectionChange('complainant', 'fullName', e.target.value)} required />
			<input type="text" placeholder="Parent's Name" value={formData.complainant.parentsName} onChange={e => handleSectionChange('complainant', 'parentsName', e.target.value)} />
			<input type="number" min="0" placeholder="Age" value={formData.complainant.age} onChange={e => handleSectionChange('complainant', 'age', e.target.value)} />
			<select value={formData.complainant.gender} onChange={e => handleSectionChange('complainant', 'gender', e.target.value)}>
				<option value="">Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="Other">Other</option>
			</select>
			<input type="date" value={formData.complainant.dob} onChange={e => handleSectionChange('complainant', 'dob', e.target.value)} />
			<input type="text" placeholder="Nationality" value={formData.complainant.nationality} onChange={e => handleSectionChange('complainant', 'nationality', e.target.value)} />
			<input type="text" placeholder="Occupation" value={formData.complainant.occupation} onChange={e => handleSectionChange('complainant', 'occupation', e.target.value)} />
			<textarea placeholder="Address" value={formData.complainant.address} onChange={e => handleSectionChange('complainant', 'address', e.target.value)} rows={2} />
			<input type="tel" placeholder="Phone Number" value={formData.complainant.phoneNumber} onChange={e => handleSectionChange('complainant', 'phoneNumber', e.target.value)} />
			<input type="email" placeholder="Email Address" value={formData.complainant.emailAddress} onChange={e => handleSectionChange('complainant', 'emailAddress', e.target.value)} />

			<h2>4. Complainant ID Proof</h2>
			<input type="text" placeholder="ID Type" value={formData.complainantIdProof.idType} onChange={e => handleSectionChange('complainantIdProof', 'idType', e.target.value)} />
			<input type="text" placeholder="ID Number" value={formData.complainantIdProof.idNumber} onChange={e => handleSectionChange('complainantIdProof', 'idNumber', e.target.value)} />

			<h2>5. Incident Details</h2>
			<label>Occurrence Start Time</label>
			<input type="datetime-local" value={formData.incidentDetails.occurrenceStartTime} onChange={e => handleSectionChange('incidentDetails', 'occurrenceStartTime', e.target.value)} />
			<label>Occurrence End Time</label>
			<input type="datetime-local" value={formData.incidentDetails.occurrenceEndTime} onChange={e => handleSectionChange('incidentDetails', 'occurrenceEndTime', e.target.value)} />
			<textarea placeholder="Place of Occurrence" value={formData.incidentDetails.placeOfOccurrence} onChange={e => handleSectionChange('incidentDetails', 'placeOfOccurrence', e.target.value)} rows={2} />
			<input type="text" placeholder="Distance from Police Station" value={formData.incidentDetails.distanceFromStation} onChange={e => handleSectionChange('incidentDetails', 'distanceFromStation', e.target.value)} />
			<input type="text" placeholder="Offence Type" value={formData.incidentDetails.offenceType} onChange={e => handleSectionChange('incidentDetails', 'offenceType', e.target.value)} />
			<textarea placeholder="Description" value={formData.incidentDetails.description} onChange={e => handleSectionChange('incidentDetails', 'description', e.target.value)} rows={4} />
			<textarea placeholder="Act and Sections" value={formData.incidentDetails.actAndSections} onChange={e => handleSectionChange('incidentDetails', 'actAndSections', e.target.value)} rows={2} />

			<h2>6. Accused Persons</h2>
			{formData.accusedPersons.map((accused, index) => (
				<div key={index}>
					<input type="text" placeholder="Name" value={accused.name} onChange={e => handleAccusedChange(index, 'name', e.target.value)} required />
					<input type="text" placeholder="Alias Name" value={accused.aliasName} onChange={e => handleAccusedChange(index, 'aliasName', e.target.value)} />
					<textarea placeholder="Address" value={accused.address} onChange={e => handleAccusedChange(index, 'address', e.target.value)} rows={2} />
					<input type="number" min="0" placeholder="Age" value={accused.age} onChange={e => handleAccusedChange(index, 'age', e.target.value)} />
					<select value={accused.gender} onChange={e => handleAccusedChange(index, 'gender', e.target.value)}>
						<option value="">Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
					<input type="text" placeholder="Relation with Complainant" value={accused.relationWithComplainant} onChange={e => handleAccusedChange(index, 'relationWithComplainant', e.target.value)} />
					{formData.accusedPersons.length > 1 && (
						<button type="button" onClick={() => removeAccused(index)}>Remove</button>
					)}
				</div>
			))}
			<button type="button" onClick={addAccused}>Add Accused Person</button>

			<h2>7. Witnesses</h2>
			{formData.witnesses.map((witness, index) => (
				<div key={index}>
					<input type="text" placeholder="Name" value={witness.name} onChange={e => handleWitnessChange(index, 'name', e.target.value)} required />
					<textarea placeholder="Address" value={witness.address} onChange={e => handleWitnessChange(index, 'address', e.target.value)} rows={2} />
					<input type="text" placeholder="Contact Info" value={witness.contactInfo} onChange={e => handleWitnessChange(index, 'contactInfo', e.target.value)} />
					{formData.witnesses.length > 1 && (
						<button type="button" onClick={() => removeWitness(index)}>Remove</button>
					)}
				</div>
			))}
			<button type="button" onClick={addWitness}>Add Witness</button>

			<h2>8. Evidence Details</h2>
			<textarea placeholder="Documents" value={formData.evidenceDetails.documents} onChange={e => handleSectionChange('evidenceDetails', 'documents', e.target.value)} rows={2} />
			<input type="text" placeholder="Media Type" value={formData.evidenceDetails.mediaType} onChange={e => handleSectionChange('evidenceDetails', 'mediaType', e.target.value)} />
			<textarea placeholder="Media Description" value={formData.evidenceDetails.mediaDescription} onChange={e => handleSectionChange('evidenceDetails', 'mediaDescription', e.target.value)} rows={2} />
			<textarea placeholder="Physical Description" value={formData.evidenceDetails.physicalDescription} onChange={e => handleSectionChange('evidenceDetails', 'physicalDescription', e.target.value)} rows={2} />

			<h2>9. Investigation Officer Details</h2>
			<input type="text" placeholder="IO Name" value={formData.investigationOfficer.ioName} onChange={e => handleSectionChange('investigationOfficer', 'ioName', e.target.value)} />
			<input type="text" placeholder="IO Rank" value={formData.investigationOfficer.ioRank} onChange={e => handleSectionChange('investigationOfficer', 'ioRank', e.target.value)} />
			<input type="text" placeholder="IO Badge Number" value={formData.investigationOfficer.ioBadgeNumber} onChange={e => handleSectionChange('investigationOfficer', 'ioBadgeNumber', e.target.value)} />
			<label>Dispatch Date</label>
			<input type="date" value={formData.investigationOfficer.dispatchDate} onChange={e => handleSectionChange('investigationOfficer', 'dispatchDate', e.target.value)} />

	
			<button type="submit" >Submit FIR</button>
		</form>
	</>
);
}

export default FIRForm;
