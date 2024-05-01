import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { useLocation } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";

function CreateProfile() {

    console.log(auth.currentUser.uid)
    const location = useLocation();
    const email = location.state.email;
    const firstName = location.state.firstName;
    const lastName = location.state.lastName;

    const [profile, setProfile] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: '',
        birthdate: '',
        gender: '',
        pet:'',
    });

    const navigate = useNavigate();

    const handleChange = (prop) => (event) => {
        setProfile({ ...profile, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const uid = auth.currentUser.uid;
        const userRef = doc(db, 'users', uid);
        try {
            await setDoc(userRef, profile); // Save the profile data
            await updateProfile(auth.currentUser, { displayName: `${profile.firstName} ${profile.lastName.charAt(0)}` });
            console.log('Profile created successfully');
            navigate('/dashboard'); // Navigate to dashboard after success
        } catch (error) {
            console.error('Error creating profile:', error);
            
        }
    };
    

    return (
        <Stack
            spacing={2}
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '400px',
                margin: 'auto',
                marginTop: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '60px',
                border: '1px solid #ccc',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: '#fff'
            }}
        >
            <Typography variant="h6">Create Profile</Typography>

            {['firstName', 'lastName', 'email'].map((field) => (
                <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    variant="outlined"
                    value={profile[field]}
                    onChange={handleChange(field)}
                    fullWidth
                    disabled
                />
            ))}

            <TextField
                label="Phone Number"
                variant="outlined"
                value={profile.phoneNumber}
                onChange={handleChange('phoneNumber')}
                fullWidth
                placeholder="e.g., 1234567890"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />

            <TextField
                label="Birthdate"
                type="date"
                variant="outlined"
                value={profile.birthdate}
                onChange={handleChange('birthdate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    value={profile.gender}
                    label="Gender"
                    onChange={handleChange('gender')}
                    fullWidth
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="">Prefer not to say</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="pet-label">Pet</InputLabel>
                <Select
                    labelId="pet-label"
                    value={profile.pet}
                    label="Pet"
                    onChange={handleChange('pet')}
                    fullWidth
                >
                    <MenuItem value="dog">Dogs</MenuItem>
                    <MenuItem value="cat">Cats</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Create Profile
            </Button>
        </Stack>
    );
}

export default CreateProfile;
