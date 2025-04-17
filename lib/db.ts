import { db } from "@/lib/firebase"
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc,
} from "firebase/firestore"

// User-related functions
export async function createUser(uid: string, data: any) {
  return setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: Timestamp.now(),
  })
}

export async function getUser(uid: string) {
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
}

export async function updateUser(uid: string, data: any) {
  const userRef = doc(db, "users", uid)
  return updateDoc(userRef, data)
}

// Lesson-related functions
export async function createLesson(data: any) {
  return addDoc(collection(db, "lessons"), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
}

export async function getLessons() {
  const lessonsQuery = query(collection(db, "lessons"), orderBy("createdAt", "desc"))

  const snapshot = await getDocs(lessonsQuery)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function getLesson(id: string) {
  const docRef = doc(db, "lessons", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
}

export async function updateLesson(id: string, data: any) {
  const lessonRef = doc(db, "lessons", id)
  return updateDoc(lessonRef, {
    ...data,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteLesson(id: string) {
  return deleteDoc(doc(db, "lessons", id))
}

// Course-related functions
export async function createCourse(data: any) {
  return addDoc(collection(db, "courses"), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
}

export async function getCourses() {
  const coursesQuery = query(collection(db, "courses"), orderBy("createdAt", "desc"))

  const snapshot = await getDocs(coursesQuery)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function getCourse(id: string) {
  const docRef = doc(db, "courses", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
}

export async function updateCourse(id: string, data: any) {
  const courseRef = doc(db, "courses", id)
  return updateDoc(courseRef, {
    ...data,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteCourse(id: string) {
  return deleteDoc(doc(db, "courses", id))
}

// Enrollment-related functions
export async function createEnrollment(userId: string, courseId: string, data: any = {}) {
  return addDoc(collection(db, "enrollments"), {
    userId,
    courseId,
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
}

export async function getUserEnrollments(userId: string) {
  const enrollmentsQuery = query(
    collection(db, "enrollments"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  )

  const snapshot = await getDocs(enrollmentsQuery)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
