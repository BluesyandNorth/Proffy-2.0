import React, { useState, FormEvent } from 'react';
import PageHeader from '../../Components/PageHeader';

import smileIcon from '../../Assets/Icons/smile.svg';

import {
    TeacherListContainer,
    DescriptionContent,
    Filter,
    NoneFilter,
    Form,
} from './styled';
import Select from './../../Components/Elements/Select/index';
import Input from './../../Components/Elements/Input/index';
import TeacherItem from './../../Components/TeacherItem/index';
import TimeCard from './../../Components/TimeCard/index';

function TeacherList() {
    const [searchTeachers, setSearchTeachers] = useState(false);
    function handleSearchTeachers() {
        if (!searchTeachers) {
            return setSearchTeachers(true);
        } else {
            return setSearchTeachers(false);
        }
    }

    function handleToggleSubmit(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <TeacherListContainer className="teachers-container">
            <PageHeader
                title="Estes são os proffys disponíveis."
                navTitle="Estudar"
                styles={
                    !searchTeachers
                        ?
                        { height: "25rem" }
                        :
                        { height: "60rem" }
                }
            >
                <div className="description-container">
                    <DescriptionContent>
                        <img src={smileIcon} alt="Emote Sorrindo" />
                        <p>Nós temos 32 professores.</p>
                        {!searchTeachers &&
                            <Filter onClick={handleSearchTeachers}>
                                <span
                                    className="iconify"
                                    data-icon="mdi-filter-plus"
                                    data-inline="false">
                                </span>
                            </Filter>
                        }
                        {
                            searchTeachers &&
                            <NoneFilter onClick={handleSearchTeachers}>
                                <span
                                    className="iconify"
                                    data-icon="clarity:filter-off-solid"
                                    data-inline="false">
                                </span>
                            </NoneFilter>
                        }
                    </DescriptionContent>
                    <Form
                        onSubmit={handleToggleSubmit}
                        style={
                            !searchTeachers
                                ?
                                {
                                    opacity: "0%",
                                    transition: "0.8s",

                                }
                                :
                                {
                                    opacity: "100%",
                                    transition: "0.5s",
                                }
                        }
                    >
                        <Select
                            name="subject"
                            label="Matéria"
                            padrao="Selecione uma matéria"
                            options={[
                                { value: "Matemática", label: "Matemática" },
                                { value: "Fisica", label: "Fisica" },
                                { value: "Artes", label: "Artes" },
                                { value: "Geografia", label: "Geografia" },
                                { value: "Filosofia", label: "Filosofia" },
                                { value: "Ciências", label: "Ciências" },
                                { value: "Inglês", label: "Inglês" },
                                { value: "Biologia", label: "Biologia" },
                                { value: "Quimica", label: "Quimica" },
                            ]}
                        />
                        <Select
                            name="week_day"
                            label="Dia da semana"
                            padrao="Selecione um dia"
                            options={[
                                { value: "0", label: "Domingo" },
                                { value: "1", label: "Segunda-feira" },
                                { value: "2", label: "Terça-feira" },
                                { value: "3", label: "Quarta-feira" },
                                { value: "4", label: "Quinta-feira" },
                                { value: "5", label: "Sexta-feira" },
                                { value: "6", label: "Sabado" },
                            ]}
                        />
                        <Input
                            name="time"
                            label="Horário"
                            type="time"
                        />
                        <button>
                            <span><i className="fab fa-searchengin"></i></span>
                        </button>
                    </Form>
                </div>
            </PageHeader>
            <main
                style={!searchTeachers ? { top: "-6rem" } : { top: "6rem" }}
            >
                <TeacherItem
                    name="Henrique"
                    bio="Hmm Café Docinhu."
                    price={50}
                    subject="Programing"
                    whatsapp="1111111"
                    avatar="https://scontent-gru1-1.xx.fbcdn.net/v/t1.0-9/51795498_1083410521838177_3500642089929015296_n.jpg?_nc_cat=106&_nc_sid=84a396&_nc_ohc=e9hgydwgFUAAX-WUpED&_nc_ht=scontent-gru1-1.xx&oh=1cdd0cd9f501729df56ec43e3ec4e925&oe=5F5E13D3"
                    id={1}
                >
                    <TimeCard
                        time={[
                            { from: 20, to: 10 },
                        ]}
                        week_day={[
                            { value: "0", label: "Segunda" },
                        ]}
                    />
                    <TimeCard
                        time={[
                            { from: 20, to: 10 },
                        ]}
                        week_day={[
                            { value: "1", label: "Terça" },
                        ]}
                    />
                    <TimeCard
                        time={[
                            { from: 20, to: 10 },
                        ]}
                        week_day={[
                            { value: "0", label: "Quarta" },
                        ]}
                    />

                    <TimeCard
                        time={[
                            { from: 20, to: 10 },
                        ]}
                        week_day={[
                            { value: "0", label: "Quinta" },
                        ]}
                    />

                    <TimeCard
                        time={[
                            { from: 20, to: 10 },
                        ]}
                        week_day={[
                            { value: "0", label: "Sexta" },
                        ]}
                    />

                </TeacherItem>

                <TeacherItem
                    name="Luiz Pedro"
                    bio="Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
                    price={20}
                    subject="Programing"
                    whatsapp="1111111"
                    avatar="https://pbs.twimg.com/profile_images/1142473888733061122/PkczdiXG_400x400.jpg"
                    id={1}
                >
                    <TimeCard
                        time={[
                            { from: 20, to: 10 },
                        ]}
                        week_day={[
                            { value: "1", label: "Segunda" },
                        ]}
                    />
                    <TimeCard
                        time={[
                            { from: 9, to: 12 },
                        ]}
                        week_day={[
                            { value: "2", label: "Terça" },
                        ]}
                    />
                    <TimeCard
                        time={[
                            { from: 8, to: 12 },
                        ]}
                        week_day={[
                            { value: "3", label: "Quarta" },
                        ]}
                    />
                    <TimeCard
                        time={[
                            { from: 8, to: 16 },
                        ]}
                        week_day={[
                            { value: "4", label: "Quinta" },
                        ]}
                    />
                    <TimeCard
                        time={[
                            { from: 20, to: 10 },
                        ]}
                        week_day={[
                            { value: "5", label: "Sexta" },
                        ]}
                    />
                </TeacherItem>
            </main>
        </TeacherListContainer>
    );
}
export default TeacherList;