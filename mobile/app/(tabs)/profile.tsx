// // // import React, { useState } from 'react';
// // // import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// // // import { updateProfile } from '@/services/api';

// // // export default function SettingsScreen() {
// // //   const [username, setUsername] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [message, setMessage] = useState('');
// // //   const [success, setSuccess] = useState(true);

// // //   const handleUpdate = async () => {
// // //     const success = await updateProfile(username, password);
// // //     if (success) {
// // //         setMessage('Profile updated successfully!');
// // //         setSuccess(true);
// // //     } else {
// // //         setMessage('Update failed. Please try again.');
// // //         setSuccess(false);
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text>Update Profile</Text>
// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="New Username"
// // //         value={username}
// // //         onChangeText={setUsername}
// // //       />
// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="New Password"
// // //         value={password}
// // //         onChangeText={setPassword}
// // //         secureTextEntry
// // //       />
// // //       <Button title="Update" onPress={handleUpdate} />
// // //       {message && (
// // //         <Text style={[styles.message, { color: success ? "green" : "red" }]}>
// // //           {message}
// // //         </Text>
// // //       )}
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     padding: 16,
// // //   },
// // //   message: {
// // //     marginTop: 20,
// // //     textAlign: "center",
// // //   },
// // //   input: {
// // //     height: 40,
// // //     borderColor: 'gray',
// // //     borderWidth: 1,
// // //     marginBottom: 12,
// // //     paddingHorizontal: 8,
// // //   },
// // // });
// // import React, { useState } from "react";
// // import { View, Text, TextInput, StyleSheet } from "react-native";
// // import { Avatar, IconButton, Button } from "react-native-paper";
// // import { updateProfile } from "@/services/api";

// // export default function ProfileScreen() {
// //   const [username, setUsername] = useState("John Doe"); // Example username
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [email, setemail] = useState("");
// //   const [phone, setphone] = useState("");
// //   const [country, setcountry] = useState("");
// //   const [firstName, setfirstName] = useState("");
// //   const [lastName, setlastName] = useState("");
// //   const [success, setSuccess] = useState(true);
// //   const [isEditing, setIsEditing] = useState(false);

// //   const handleUpdate = async () => {
// //     const success = await updateProfile(
// //       username,
// //       password,
// //       email,
// //       phone,
// //       country,
// //       firstName,
// //       lastName
// //     );
// //     if (success) {
// //       setMessage("Profile updated successfully!");
// //       setSuccess(true);
// //       setIsEditing(false);
// //     } else {
// //       setMessage("Update failed. Please try again.");
// //       setSuccess(false);
// //     }
// //   };

// //   const handleEdit = () => {
// //     setIsEditing(true);
// //   };

// //   const handleCancel = () => {
// //     setIsEditing(false);
// //     setPassword(""); // Optionally reset the password field
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Avatar.Image
// //           size={80}
// //           source={{ uri: "https://via.placeholder.com/150" }} // Placeholder image URL
// //           style={styles.avatar}
// //         />
// //         <View style={styles.nameContainer}>
// //           <Text style={styles.name}>{username}</Text>
// //           <IconButton
// //             icon="pencil"
// //             size={20}
// //             onPress={handleEdit}
// //             style={styles.editIcon}
// //           />
// //         </View>
// //       </View>

// //       {isEditing ? (
// //         <View style={styles.formContainer}>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="New Username"
// //             value={username}
// //             onChangeText={setUsername}
// //           />
// //           <TextInput
// //             style={styles.input}
// //             placeholder="New Password"
// //             value={password}
// //             onChangeText={setPassword}
// //             secureTextEntry
// //           />
// //           <View style={styles.buttonContainer}>
// //             <Button
// //               mode="contained"
// //               onPress={handleUpdate}
// //               style={styles.updateButton}
// //             >
// //               Update Profile
// //             </Button>
// //             <Button
// //               mode="outlined"
// //               onPress={handleCancel}
// //               style={styles.cancelButton}
// //             >
// //               Cancel
// //             </Button>
// //           </View>
// //         </View>
// //       ) : (
// //         <View style={styles.detailsContainer}>
// //           <Text style={styles.detailLabel}>Email:</Text>
// //           <Text classname="text-red" >john.doe@example.com</Text>
// //           <Text style={styles.detailLabel}>Phone:</Text>
// //           <Text style={styles.detailValue}>+1 (555) 555-5555</Text>
// //         </View>
// //       )}

// //       {message && (
// //         <Text style={[styles.message, { color: success ? "green" : "red" }]}>
// //           {message}
// //         </Text>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: "#f9f9f9",
// //   },
// //   header: {
// //     alignItems: "center",
// //     marginBottom: 24,
// //   },
// //   avatar: {
// //     marginBottom: 16,
// //   },
// //   nameContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   name: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     marginRight: 8,
// //   },
// //   editIcon: {
// //     marginTop: 5,
// //   },
// //   formContainer: {
// //     marginBottom: 24,
// //   },
// //   input: {
// //     height: 40,
// //     borderColor: "gray",
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     marginBottom: 12,
// //     paddingHorizontal: 8,
// //   },
// //   buttonContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //   },
// //   updateButton: {
// //     flex: 1,
// //     marginRight: 8,
// //   },
// //   cancelButton: {
// //     flex: 1,
// //     marginLeft: 8,
// //   },
// //   detailsContainer: {
// //     marginTop: 24,
// //   },
// //   detailLabel: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     marginBottom: 4,
// //   },
// //   detailValue: {
// //     fontSize: 16,
// //     marginBottom: 16,
// //     color: "#555",
// //   },
// //   message: {
// //     marginTop: 20,
// //     textAlign: "center",
// //     fontSize: 16,
// //   },
// // });
// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   ScrollView, 
//   TouchableOpacity, 
//   Switch, 
//   Image, 
//   StyleSheet, 
//   useColorScheme 
// } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// import { SafeAreaView } from 'react-native-safe-area-context';

// // --- Custom Colors based on your Tailwind config ---
// const COLORS = {
//   primary: '#0d59f2',
//   backgroundLight: '#f5f6f8',
//   backgroundDark: '#101622',
//   surfaceDark: '#1a2235',
//   surfaceLight: '#ffffff',
//   slate900: '#0f172a',
//   slate800: '#1e293b',
//   slate500: '#64748b',
//   slate400: '#94a3b8',
//   red500: '#ef4444',
//   purple500: '#a855f7',
//   orange500: '#f97316',
//   white: '#ffffff',
// };

// // --- Helper Components for Clarity ---

// const SettingItemButton = ({ icon, title, subtitle, onPress, iconColor = COLORS.slate500 }) => (
//   <TouchableOpacity style={styles.settingButton} onPress={onPress}>
//     <View style={styles.settingContent}>
//       <View style={[styles.iconContainer, { backgroundColor: '#f1f5f9' }, useColorScheme() === 'dark' && { backgroundColor: '#222f49' }]}>
//         <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
//       </View>
//       <View style={styles.settingTextContainer}>
//         <Text style={styles.settingTitle}>{title}</Text>
//         {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
//       </View>
//     </View>
//     <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.slate400} />
//   </TouchableOpacity>
// );

// const SettingItemToggle = ({ icon, title, isChecked, onToggle, isColorDisplay = false, colorDisplayStyle }) => (
//   <View style={styles.settingToggle}>
//     <View style={styles.settingContent}>
//       <View style={[styles.iconContainer, useColorScheme() === 'dark' && { backgroundColor: '#222f49' }]}>
//         <MaterialCommunityIcons name={icon} size={24} color={COLORS.slate500} />
//       </View>
//       <Text style={styles.settingTitle}>{title}</Text>
//     </View>
//     {isColorDisplay ? (
//       <View style={[styles.colorDisplay, colorDisplayStyle]} />
//     ) : (
//       <Switch
//         trackColor={{ false: COLORS.slate400, true: COLORS.primary }}
//         thumbColor={COLORS.white}
//         onValueChange={onToggle}
//         value={isChecked}
//       />
//     )}
//   </View>
// );

// // --- Main Component ---

// export default function ProfileScreen() {
//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === 'dark';
  
//   const [biometricEnabled, setBiometricEnabled] = useState(true);
//   const [dailyReminders, setDailyReminders] = useState(true);
//   const [weeklyInsights, setWeeklyInsights] = useState(false);

//   // Determine dynamic colors for background and text
//   const backgroundColor = isDark ? COLORS.backgroundDark : COLORS.backgroundLight;
//   const textColor = isDark ? COLORS.white : COLORS.slate900;
  
//   // Use a functional header wrapper for the fixed bar
//   const HeaderBar = () => (
//     <View style={[styles.headerFixed, { backgroundColor: isDark ? 'rgba(16, 22, 34, 0.8)' : 'rgba(245, 246, 248, 0.8)' }]}>
//       <View style={styles.headerContent}>
//         <TouchableOpacity style={styles.backButton}>
//           <MaterialCommunityIcons name="arrow-left" size={24} color={textColor} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: textColor }]}>Profile & Settings</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
//       <HeaderBar />
//       <ScrollView 
//         style={{ flex: 1, backgroundColor: backgroundColor }}
//         contentContainerStyle={styles.scrollViewContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.profileHeader}>
//           <View style={styles.avatarContainer}>
//             <Image
//               source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXIBcYM2kkvVLK7a0hH2Yj0NQ9U5kmm-6Om-F-mGMxRZwIKAq0hLqVd5IR1L1qR3EiVpgxAAeuhhlSz-ORxEflDRNkjv_WXJGGbWBxOz-Rdj0LgAvXds2C5_AQAsccN_M_zZnDY2y9gmzh3fqxl0nRkJW_0xdpyok2_8dP2m-RbDm376oGXoKvYy8nh4fxcCQ-4Jv2aN3dg50bv15P3QH4A9Azrx-gBsD4PAgzJj9bYrzEnaLl9EfVV4rjLJeRXA4zvHOe77OGQxo" }}
//               style={styles.avatarImage}
//               accessibilityLabel="User profile picture"
//             />
//             {/* Edit Badge */}
//             <View style={styles.editBadge}>
//               <MaterialCommunityIcons name="pencil" size={16} color={COLORS.white} />
//             </View>
//           </View>

//           <View style={styles.profileText}>
//             <Text style={[styles.username, { color: textColor }]}>Alex Voyager</Text>
//             <Text style={styles.memberSince}>Member since 2042</Text>
            
//             {/* Mood Pulse Badge */}
//             <View style={styles.moodPulseBadge}>
//               <MaterialCommunityIcons name="heart-pulse" size={18} color={COLORS.primary} />
//               <Text style={styles.moodPulseText}>Mood Pulse: Optimistic</Text>
//             </View>
//           </View>
//         </View>

//         {/* Stats Overview Component (Horizontal Scroll) */}
//         <ScrollView horizontal style={styles.statsContainer} showsHorizontalScrollIndicator={false}>
//           {/* Stat 1 */}
//           <View style={styles.statBox}>
//             <MaterialCommunityIcons name="book-open-variant" size={24} color={COLORS.primary} style={styles.statIcon} />
//             <Text style={[styles.statValue, { color: textColor }]}>142</Text>
//             <Text style={styles.statLabel}>ENTRIES</Text>
//           </View>
//           {/* Stat 2 */}
//           <View style={styles.statBox}>
//             <MaterialCommunityIcons name="star-four-points" size={24} color={COLORS.purple500} style={styles.statIcon} />
//             <Text style={[styles.statValue, { color: textColor }]}>89</Text>
//             <Text style={styles.statLabel}>INSIGHTS</Text>
//           </View>
//           {/* Stat 3 */}
//           <View style={styles.statBox}>
//             <MaterialCommunityIcons name="fire" size={24} color={COLORS.orange500} style={styles.statIcon} />
//             <Text style={[styles.statValue, { color: textColor }]}>12</Text>
//             <Text style={styles.statLabel}>STREAK</Text>
//           </View>
//         </ScrollView>

//         <View style={styles.sectionSpacer} />

//         {/* Section: Account & Security */}
//         <View style={styles.sectionWrapper}>
//           <Text style={styles.sectionHeader}>ACCOUNT & SECURITY</Text>
//           <View style={styles.settingsGroup}>
//             <SettingItemButton icon="account-edit" title="Edit Profile" subtitle={undefined} onPress={undefined} />
//             <SettingItemButton icon="lock-reset" title="Change Password" subtitle={undefined} onPress={undefined} />
//             <SettingItemToggle 
//               icon="fingerprint"
//               title="Biometric Login"
//               isChecked={biometricEnabled}
//               onToggle={setBiometricEnabled} colorDisplayStyle={undefined}            />
//           </View>
//         </View>

//         <View style={styles.sectionSpacer} />

//         {/* Section: AI & Experience */}
//         <View style={styles.sectionWrapper}>
//           <Text style={styles.sectionHeader}>AI & EXPERIENCE</Text>
//           <View style={styles.settingsGroup}>
//             <SettingItemButton 
//               icon="brain"
//               title="AI Personality"
//               subtitle="Current: Empathetic" onPress={undefined}            />
//             <SettingItemToggle 
//               icon="palette"
//               title="Theme"
//               isColorDisplay={true}
//               colorDisplayStyle={styles.themeColorDisplay} isChecked={undefined} onToggle={undefined}            />
//           </View>
//         </View>

//         <View style={styles.sectionSpacer} />

//         {/* Section: System & Notifications */}
//         <View style={styles.sectionWrapper}>
//           <Text style={styles.sectionHeader}>SYSTEM</Text>
//           <View style={styles.settingsGroup}>
//             <SettingItemToggle 
//               icon="bell-badge"
//               title="Daily Reminders"
//               isChecked={dailyReminders}
//               onToggle={setDailyReminders} colorDisplayStyle={undefined}            />
//             <SettingItemToggle 
//               icon="email-open-outline"
//               title="Weekly Insights"
//               isChecked={weeklyInsights}
//               onToggle={setWeeklyInsights} colorDisplayStyle={undefined}            />
//           </View>
//         </View>

//         <View style={styles.footerSpacer} />

//         {/* Danger Zone & Footer */}
//         <View style={styles.footerContainer}>
//           <TouchableOpacity style={styles.signOutButton}>
//             <MaterialCommunityIcons name="logout" size={24} color={COLORS.red500} />
//             <Text style={styles.signOutText}>Sign Out</Text>
//           </TouchableOpacity>
//           <Text style={styles.versionText}>Version 2.0.4 • Build 8921</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // --- StyleSheet Definitions ---

// const styles = StyleSheet.create({
//   // Global Layout and Header
//   scrollViewContent: {
//     paddingBottom: 20,
//     maxWidth: 500,
//     alignSelf: 'center',
//     width: '100%',
//   },
//   headerFixed: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 50,
//     paddingTop: 16, // Assuming SafeAreaView handles some padding, adjust as needed
//     paddingBottom: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb', // Slate 200
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     maxWidth: 500,
//     alignSelf: 'center',
//     width: '100%',
//   },
//   backButton: {
//     width: 48,
//     height: 48,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 9999,
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '700',
//     paddingRight: 48, // Balance the back button space
//   },

//   // Profile Header
//   profileHeader: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: 16,
//     gap: 24,
//     marginTop: 8, // Below the fixed header area
//   },
//   avatarContainer: {
//     position: 'relative',
//   },
//   avatarImage: {
//     width: 128,
//     height: 128,
//     borderRadius: 64,
//     borderWidth: 4,
//     borderColor: COLORS.backgroundLight,
//   },
//   editBadge: {
//     position: 'absolute',
//     bottom: 4,
//     right: 4,
//     backgroundColor: COLORS.primary,
//     padding: 6,
//     borderRadius: 9999,
//     borderWidth: 4,
//     borderColor: COLORS.backgroundLight,
//   },
//   profileText: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 4,
//   },
//   username: {
//     fontSize: 24,
//     fontWeight: '700',
//   },
//   memberSince: {
//     color: COLORS.slate500,
//     fontSize: 12,
//   },
//   moodPulseBadge: {
//     marginTop: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 9999,
//     backgroundColor: 'rgba(13, 89, 242, 0.1)', // primary/10
//     borderWidth: 1,
//     borderColor: 'rgba(13, 89, 242, 0.2)', // primary/20
//   },
//   moodPulseText: {
//     color: COLORS.primary,
//     fontSize: 14,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },

//   // Stats Overview
//   statsContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginBottom: 24,
//   },
//   statBox: {
//     width: 120,
//     flexDirection: 'column',
//     gap: 4,
//     borderRadius: 16,
//     backgroundColor: COLORS.surfaceLight,
//     borderWidth: 1,
//     borderColor: '#e2e8f0', // Slate 200
//     padding: 16,
//     alignItems: 'center',
//     textAlign: 'center',
//     marginRight: 12, // Gap spacing
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   statIcon: {
//     marginBottom: 4,
//   },
//   statValue: {
//     fontSize: 24,
//     fontWeight: '700',
//   },
//   statLabel: {
//     color: COLORS.slate500,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     textTransform: 'uppercase',
//   },

//   // Settings Sections
//   sectionWrapper: {
//     paddingHorizontal: 16,
//   },
//   sectionHeader: {
//     color: COLORS.slate400,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1.5,
//     textTransform: 'uppercase',
//     paddingHorizontal: 8,
//     marginBottom: 12,
//   },
//   settingsGroup: {
//     flexDirection: 'column',
//     backgroundColor: COLORS.surfaceLight,
//     borderRadius: 24,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#e2e8f0', // Slate 200
//   },
//   sectionSpacer: {
//     height: 24,
//   },
  
//   // Setting Item Styles
//   settingButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     minHeight: 64,
//     justifyContent: 'space-between',
//     backgroundColor: COLORS.surfaceLight,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e2e8f0', // Separator color
//   },
//   settingToggle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     minHeight: 64,
//     justifyContent: 'space-between',
//     backgroundColor: COLORS.surfaceLight,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e2e8f0',
//   },
//   settingContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f1f5f9', // Slate 100
//     flexShrink: 0,
//   },
//   settingTextContainer: {
//     flex: 1,
//   },
//   settingTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: COLORS.slate900,
//   },
//   settingSubtitle: {
//     fontSize: 12,
//     color: COLORS.slate500,
//   },

//   // Theme Specific Overrides (Need to be applied conditionally)
//   // To simulate dark mode surfaces:
//   // Note: These would ideally be managed by a custom hook or component
//   // For simplicity, using inline styles on the components for dark mode surface colors.

//   // Theme Color Display
//   colorDisplay: {
//     width: 24,
//     height: 24,
//     borderRadius: 9999,
//     borderWidth: 1,
//     borderColor: COLORS.white,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   themeColorDisplay: {
//     // Gradient simulation is complex in RN, use a solid color or mock gradient
//     backgroundColor: COLORS.primary, 
//   },

//   // Footer / Danger Zone
//   footerSpacer: {
//     height: 32,
//   },
//   footerContainer: {
//     paddingHorizontal: 16,
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 16,
//   },
//   signOutButton: {
//     width: '100%',
//     height: 56,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(239, 68, 68, 0.3)', // red-500/30
//     backgroundColor: 'rgba(239, 68, 68, 0.1)', // red-500/10
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//   },
//   signOutText: {
//     color: COLORS.red500,
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   versionText: {
//     fontSize: 10,
//     color: COLORS.slate400,
//     fontFamily: 'monospace', // Use a monospaced font if available
//   },
// });


import type React from "react"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { useSession } from "@/lib/ctx"
import { updateProfile } from "@/services/api"
import { useRouter } from "expo-router"

export default function ProfileScreen() {
  const router = useRouter()
  const { signOut, session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    username: "",
  })

  const handleSaveProfile = async () => {
    try {
      const success = await updateProfile(
        profile.username,
        "", // password - not updating
        profile.email,
        profile.phone,
        profile.country,
        profile.firstName,
        profile.lastName,
      )

      if (success) {
        Alert.alert("Success", "Profile updated successfully!")
        setIsEditing(false)
      } else {
        Alert.alert("Error", "Failed to update profile")
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong")
    }
  }

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: signOut,
      },
    ])
  }

  const SettingItem = ({
    icon,
    label,
    value,
    onPress,
    rightElement,
    danger = false,
  }: {
    icon: string
    label: string
    value?: string
    onPress?: () => void
    rightElement?: React.ReactNode
    danger?: boolean
  }) => (
    <TouchableOpacity className="flex-row items-center py-4" onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${danger ? "bg-red-500/20" : "bg-card"}`}>
        <Ionicons name={icon as any} size={20} color={danger ? "#ef4444" : "#f97316"} />
      </View>
      <View className="flex-1">
        <Text className={danger ? "text-red-500 font-medium" : "text-foreground font-medium"}>{label}</Text>
        {value && <Text className="text-muted-foreground text-sm">{value}</Text>}
      </View>
      {rightElement || (onPress && <Ionicons name="chevron-forward" size={20} color="#737373" />)}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Text className="text-foreground text-2xl font-bold">Profile</Text>
          </Animated.View>
        </View>

        {/* Profile Card */}
        <Animated.View entering={FadeInDown.delay(200).springify()} className="px-6 mb-6">
          <LinearGradient colors={["#1c1c1c", "#0d0d0d"]} className="rounded-3xl p-6 border border-border">
            <View className="flex-row items-center">
              <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center">
                <Text className="text-primary text-3xl font-bold">{profile.firstName?.[0] || "U"}</Text>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-foreground text-xl font-bold">
                  {profile.firstName || "User"} {profile.lastName}
                </Text>
                <Text className="text-muted-foreground">@{profile.username || "username"}</Text>
              </View>
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center"
                onPress={() => setIsEditing(true)}
              >
                <Ionicons name="pencil" size={18} color="#f97316" />
              </TouchableOpacity>
            </View>

            <View className="flex-row mt-6 pt-6 border-t border-border">
              <View className="flex-1 items-center">
                <Text className="text-foreground text-2xl font-bold">156</Text>
                <Text className="text-muted-foreground text-sm">Entries</Text>
              </View>
              <View className="w-px bg-border" />
              <View className="flex-1 items-center">
                <Text className="text-foreground text-2xl font-bold">23</Text>
                <Text className="text-muted-foreground text-sm">Day Streak</Text>
              </View>
              <View className="w-px bg-border" />
              <View className="flex-1 items-center">
                <Text className="text-foreground text-2xl font-bold">89%</Text>
                <Text className="text-muted-foreground text-sm">Consistency</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Edit Profile Modal (inline) */}
        {isEditing && (
          <Animated.View entering={FadeInUp.springify()} className="px-6 mb-6">
            <View className="bg-card border border-border rounded-3xl p-5">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-foreground text-lg font-semibold">Edit Profile</Text>
                <TouchableOpacity onPress={() => setIsEditing(false)}>
                  <Ionicons name="close" size={24} color="#737373" />
                </TouchableOpacity>
              </View>

              <View className="space-y-4">
                <View className="flex-row space-x-3">
                  <View className="flex-1">
                    <Text className="text-muted-foreground text-sm mb-2">First Name</Text>
                    <TextInput
                      className="bg-background border border-border rounded-xl py-3 px-4 text-foreground"
                      value={profile.firstName}
                      onChangeText={(v) => setProfile({ ...profile, firstName: v })}
                      placeholder="First name"
                      placeholderTextColor="#737373"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-muted-foreground text-sm mb-2">Last Name</Text>
                    <TextInput
                      className="bg-background border border-border rounded-xl py-3 px-4 text-foreground"
                      value={profile.lastName}
                      onChangeText={(v) => setProfile({ ...profile, lastName: v })}
                      placeholder="Last name"
                      placeholderTextColor="#737373"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-muted-foreground text-sm mb-2">Email</Text>
                  <TextInput
                    className="bg-background border border-border rounded-xl py-3 px-4 text-foreground"
                    value={profile.email}
                    onChangeText={(v) => setProfile({ ...profile, email: v })}
                    placeholder="Email"
                    placeholderTextColor="#737373"
                    keyboardType="email-address"
                  />
                </View>

                <TouchableOpacity className="bg-primary py-3 rounded-xl items-center mt-2" onPress={handleSaveProfile}>
                  <Text className="text-white font-semibold">Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Settings Sections */}
        <Animated.View entering={FadeInDown.delay(300).springify()} className="px-6 mb-6">
          <Text className="text-muted-foreground text-sm font-medium mb-2 ml-1">PREFERENCES</Text>
          <View className="bg-card border border-border rounded-3xl px-5">
            <SettingItem
              icon="notifications"
              label="Daily Reminders"
              value="Get reminded to journal"
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: "#262626", true: "#f97316" }}
                  thumbColor="white"
                />
              }
            />
            <View className="h-px bg-border" />
            <SettingItem
              icon="moon"
              label="Dark Mode"
              value="Always on"
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: "#262626", true: "#f97316" }}
                  thumbColor="white"
                />
              }
            />
            <View className="h-px bg-border" />
            <SettingItem icon="lock-closed" label="Privacy Lock" value="Require authentication" onPress={() => {}} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).springify()} className="px-6 mb-6">
          <Text className="text-muted-foreground text-sm font-medium mb-2 ml-1">DATA</Text>
          <View className="bg-card border border-border rounded-3xl px-5">
            <SettingItem
              icon="cloud-download"
              label="Export Data"
              value="Download all entries"
              onPress={() => Alert.alert("Coming Soon", "This feature is coming soon!")}
            />
            <View className="h-px bg-border" />
            <SettingItem icon="cloud-upload" label="Backup" value="Last backup: Today" onPress={() => {}} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).springify()} className="px-6 mb-6">
          <Text className="text-muted-foreground text-sm font-medium mb-2 ml-1">SUPPORT</Text>
          <View className="bg-card border border-border rounded-3xl px-5">
            <SettingItem icon="help-circle" label="Help Center" onPress={() => {}} />
            <View className="h-px bg-border" />
            <SettingItem icon="chatbubble" label="Send Feedback" onPress={() => {}} />
            <View className="h-px bg-border" />
            <SettingItem icon="star" label="Rate Chronicle" onPress={() => {}} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).springify()} className="px-6">
          <View className="bg-card border border-border rounded-3xl px-5">
            <SettingItem icon="log-out" label="Sign Out" onPress={handleSignOut} danger />
          </View>

          <Text className="text-muted-foreground text-center text-sm mt-6">Chronicle v1.0.0</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}
