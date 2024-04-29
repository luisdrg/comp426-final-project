import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Typography, MenuItem, Select, FormControl, InputLabel, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc} from "firebase/firestore";
import { updateProfile } from "firebase/auth";

function EditProfile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        birthdate: '',
        gender: '',
        pet: ''
    });

    const navigate = useNavigate();
    
    // Get user data from Firestore
    const getUserData = async () => {
        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const [profile, setProfile] = useState({ ...userData });
    const [editable, setEditable] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        gender: false,
        pet: false
    });
    const [isChanged, setIsChanged] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setProfile({ ...userData });
    }, [userData]);

    useEffect(() => {
        setIsChanged(!Object.entries(profile).every(([key, value]) => userData[key] === value));
    }, [profile, userData]);

    const handleChange = (prop) => (event) => {
        setProfile({ ...profile, [prop]: event.target.value });
    };

    const handleToggleEdit = (prop) => {
        setEditable({ ...editable, [prop]: !editable[prop] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            try {
                await setDoc(userRef, profile, { merge: true });
                await updateProfile(auth.currentUser, { displayName: `${profile.firstName} ${profile.lastName.charAt(0)}` });
                console.log("Document successfully updated!");
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
        console.log(profile);
        setOpen(true);
        setIsChanged(false);
        setEditable({
            firstName: false,
            lastName: false,
            phoneNumber: false,
            gender: false,
            pet: false
        });
    };

    const goBack = () => {
        navigate('/');
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
            <Typography variant="h6">Edit Profile</Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                <TextField
                    label="First Name"
                    variant="outlined"
                    value={profile.firstName}
                    onChange={handleChange('firstName')}
                    fullWidth
                    disabled={!editable.firstName}
                    InputLabelProps={{ shrink: true }}
                />
                <IconButton onClick={() => handleToggleEdit('firstName')}>
                    <EditIcon />
                </IconButton>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                <TextField
                    label="Last Name"
                    variant="outlined"
                    value={profile.lastName}
                    onChange={handleChange('lastName')}
                    fullWidth
                    disabled={!editable.lastName}
                    InputLabelProps={{ shrink: true }}
                />
                <IconButton onClick={() => handleToggleEdit('lastName')}>
                    <EditIcon />
                </IconButton>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    value={profile.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    fullWidth
                    disabled={!editable.phoneNumber}
                    placeholder="e.g., 1234567890"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    InputLabelProps={{ shrink: true }}
                />
                <IconButton onClick={() => handleToggleEdit('phoneNumber')}>
                    <EditIcon />
                </IconButton>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={profile.email}
                    fullWidth
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                />
                <Tooltip title="Cannot edit email">
                    <span>
                        <IconButton disabled>
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                <TextField
                    label="Birthdate"
                    type="date"
                    variant="outlined"
                    value={profile.birthdate}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    disabled={true}
                />
                <Tooltip title="Cannot edit birthdate">
                    <span>
                        <IconButton disabled>
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                <FormControl fullWidth disabled={!editable.gender}>
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
                <IconButton onClick={() => handleToggleEdit('gender')}>
                    <EditIcon />
                </IconButton>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                <FormControl fullWidth disabled={!editable.pet}>
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
                <IconButton onClick={() => handleToggleEdit('pet')}>
                    <EditIcon />
                </IconButton>
            </Stack>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Changes saved successfully!
                </Alert>
            </Snackbar>

            <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
                <Button variant="outlined" color="primary" onClick={goBack}>
                    Back
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={!isChanged}>
                    Save
                </Button>
            </Stack>
        </Stack>
    );
}

export default EditProfile;
