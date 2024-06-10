import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Checkbox, Spinner, Box, Container, Heading, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';

const Events = () => {
    const { data: events, isLoading, isError } = useEvents();
    const addEvent = useAddEvent();
    const updateEvent = useUpdateEvent();
    const deleteEvent = useDeleteEvent();

    const [editingEventId, setEditingEventId] = useState(null);
    const [eventDetails, setEventDetails] = useState({});
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: '',
        venue_id: '',
        is_starred: false,
        private: false,
        cancelled: false,
    });

    if (isLoading) return <Spinner />;
    if (isError) return <div>Error loading events</div>;

    const handleEditClick = (event) => {
        setEditingEventId(event.id);
        setEventDetails(event);
    };

    const handleSaveClick = () => {
        updateEvent.mutate(eventDetails);
        setEditingEventId(null);
    };

    const handleDeleteClick = (eventId) => {
        deleteEvent.mutate(eventId);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleNewEventChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddEvent = () => {
        addEvent.mutate(newEvent);
        setNewEvent({
            name: '',
            date: '',
            venue_id: '',
            is_starred: false,
            private: false,
            cancelled: false,
        });
    };

    return (
        <Container maxW="container.xl">
            <Box my={4}>
                <Heading as="h1" size="xl" mb={4}>Events</Heading>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Date</Th>
                            <Th>Venue ID</Th>
                            <Th>Starred</Th>
                            <Th>Private</Th>
                            <Th>Cancelled</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {events.map((event) => (
                            <Tr key={event.id}>
                                <Td>
                                    {editingEventId === event.id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={eventDetails.name}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        event.name
                                    )}
                                </Td>
                                <Td>
                                    {editingEventId === event.id ? (
                                        <input
                                            type="date"
                                            name="date"
                                            value={eventDetails.date}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        event.date
                                    )}
                                </Td>
                                <Td>
                                    {editingEventId === event.id ? (
                                        <input
                                            type="number"
                                            name="venue_id"
                                            value={eventDetails.venue_id}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        event.venue_id
                                    )}
                                </Td>
                                <Td>
                                    {editingEventId === event.id ? (
                                        <Checkbox
                                            name="is_starred"
                                            isChecked={eventDetails.is_starred}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        event.is_starred ? 'Yes' : 'No'
                                    )}
                                </Td>
                                <Td>
                                    {editingEventId === event.id ? (
                                        <Checkbox
                                            name="private"
                                            isChecked={eventDetails.private}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        event.private ? 'Yes' : 'No'
                                    )}
                                </Td>
                                <Td>
                                    {editingEventId === event.id ? (
                                        <Checkbox
                                            name="cancelled"
                                            isChecked={eventDetails.cancelled}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        event.cancelled ? 'Yes' : 'No'
                                    )}
                                </Td>
                                <Td>
                                    {editingEventId === event.id ? (
                                        <Button onClick={handleSaveClick}>Save</Button>
                                    ) : (
                                        <Button onClick={() => handleEditClick(event)}>Edit</Button>
                                    )}
                                    <Button onClick={() => handleDeleteClick(event.id)} ml={2}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Box mt={8}>
                    <Heading as="h2" size="lg" mb={4}>Add New Event</Heading>
                    <FormControl id="name" mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" name="name" value={newEvent.name} onChange={handleNewEventChange} />
                    </FormControl>
                    <FormControl id="date" mb={4}>
                        <FormLabel>Date</FormLabel>
                        <Input type="date" name="date" value={newEvent.date} onChange={handleNewEventChange} />
                    </FormControl>
                    <FormControl id="venue_id" mb={4}>
                        <FormLabel>Venue ID</FormLabel>
                        <Input type="number" name="venue_id" value={newEvent.venue_id} onChange={handleNewEventChange} />
                    </FormControl>
                    <FormControl id="is_starred" mb={4}>
                        <Checkbox name="is_starred" isChecked={newEvent.is_starred} onChange={handleNewEventChange}>
                            Starred
                        </Checkbox>
                    </FormControl>
                    <FormControl id="private" mb={4}>
                        <Checkbox name="private" isChecked={newEvent.private} onChange={handleNewEventChange}>
                            Private
                        </Checkbox>
                    </FormControl>
                    <FormControl id="cancelled" mb={4}>
                        <Checkbox name="cancelled" isChecked={newEvent.cancelled} onChange={handleNewEventChange}>
                            Cancelled
                        </Checkbox>
                    </FormControl>
                    <Button onClick={handleAddEvent} colorScheme="teal">Add Event</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Events;