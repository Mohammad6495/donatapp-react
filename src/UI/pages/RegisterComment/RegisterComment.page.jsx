import React, { useEffect, useState } from 'react'

import './styles.scss'
import { Button, Dialog, DialogContent, Radio } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { apiCaller } from '../../../core/custom-hooks/useApi';
import { answer_apiCaller } from '../../../core/services/agent';
import { useLoadingContext } from '../../../core/contexts/LoadingContext/LoadingContext';
import { BiSolidMicrophone } from 'react-icons/bi';
import { FaStopCircle } from 'react-icons/fa';
import AudioPlayer from "react-h5-audio-player";
import { PiMicrophone } from "react-icons/pi";
import { MdPlayArrow } from "react-icons/md";

import clipboardimg from '../../../assets/images/clipboard.png' 
import boxsurveyimg from  '../../../assets/images/box-survey/box-survey-1.jpg'
import boxsurveyimg2 from  '../../../assets/images/box-survey/box-survey-2.jpg'
import boxsurveyimg3 from  '../../../assets/images/box-survey/box-survey-3.jpg'
import boxsurveyimg4 from  '../../../assets/images/box-survey/box-survey-4.jpg'
import stopvoiceImg from  '../../../assets/images/stop-voice.png'
import microphoneImg from  '../../../assets/images/microphone.png'


import "react-h5-audio-player/lib/styles.css";
const RegisterComment = () => {
    const navigate = useNavigate()
    const { orderId } = useParams()

    const { handleOpen, handleClose } = useLoadingContext()

    const [extraText, setExtraText] = useState('')

    const [openRecorder, setOpenRecorder] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const handleToggleOpenVoiceRecoder = () => {
        setOpenRecorder(!openRecorder);
    };

    const startRecording = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const recorder = new MediaRecorder(stream);
                const audioChunks = [];

                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        audioChunks.push(e.data);
                    }
                };

                recorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
                    if (audioBlob) {
                        setAudioBlob(audioBlob);
                    }
                };

                recorder.start();
                setRecording(true);
                setMediaRecorder(recorder);

                setTimeout(() => {
                    recorder.stop();
                    setRecording(false);
                    setMediaRecorder(null);
                }, 1000 * 60);
            })
            .catch((error) => {
                console.error("Error accessing microphone:", error);
            });
    };

    const cancelRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
        setRecording(false);
        setMediaRecorder(null);
    };

    const cancelRecordingAgain = () => {
        setRecording(false);
        setMediaRecorder(null);
        setAudioBlob(null);
    };

    useEffect(() => {
        return () => {
            if (mediaRecorder) {
                mediaRecorder.stop();
                setRecording(false);
                setMediaRecorder(null);
            }
        };
    }, [mediaRecorder]);
    const {
        isTrue: isShoppingExperience1,
        renderYesNoInput: ShoppingExperience1RenderInput,
        setIsTrue: setShoppingExperience1,
        title: ShoppingExperienceTitle1
    } = useYesNoInput({
        id: 'shoppingExperience1',
        initialvalue: false,
        title: 'آسان'
    })
    const {
        isTrue: isShoppingExperience2,
        renderYesNoInput: ShoppingExperience2RenderInput,
        setIsTrue: setShoppingExperience2,
        title: ShoppingExperienceTitle2
    } = useYesNoInput({
        id: 'shoppingExperience2',
        initialvalue: false,
        title: 'معمولی'
    })
    const {
        isTrue: isShoppingExperience3,
        renderYesNoInput: ShoppingExperience3RenderInput,
        setIsTrue: setShoppingExperience3,
        title: ShoppingExperienceTitle3
    } = useYesNoInput({
        id: 'shoppingExperience3',
        initialvalue: false,
        title: 'سخت'
    })
    const {
        isTrue: isAdminEncounter1,
        renderYesNoInput: AdminEncounter1RenderInput,
        setIsTrue: setAdminEncounter1,
        title: AdminEncounterTitle1
    } = useYesNoInput({
        id: 'AdminEncounter1',
        initialvalue: false,
        title: 'عالی'
    })
    const {
        isTrue: isAdminEncounter2,
        renderYesNoInput: AdminEncounter2RenderInput,
        setIsTrue: setAdminEncounter2,
        title: AdminEncounterTitle2
    } = useYesNoInput({
        id: 'AdminEncounter2',
        initialvalue: false,
        title: 'معمولی'
    })
    const {
        isTrue: isAdminEncounter3,
        renderYesNoInput: AdminEncounter3RenderInput,
        setIsTrue: setAdminEncounter3,
        title: AdminEncounterTitle3

    } = useYesNoInput({
        id: 'AdminEncounter3',
        initialvalue: false,
        title: 'ضعیف'
    })


    const {
        isTrue: isShippingTime1,
        renderYesNoInput: ShippingTime1RenderInput,
        setIsTrue: setShippingTime1,
        title: ShippingTimeTitle1
    } = useYesNoInput({
        id: 'ShippingTime1',
        initialvalue: false,
        title: 'عالی'
    })
    const {
        isTrue: isShippingTime2,
        renderYesNoInput: ShippingTime2RenderInput,
        setIsTrue: setShippingTime2,
        title: ShippingTimeTitle2
    } = useYesNoInput({
        id: 'ShippingTime2',
        initialvalue: false,
        title: 'معمولی'
    })
    const {
        isTrue: isShippingTime3,
        renderYesNoInput: ShippingTime3RenderInput,
        setIsTrue: setShippingTime3,
        title: ShippingTimeTitle3
    } = useYesNoInput({
        id: 'ShippingTime3',
        initialvalue: false,
        title: 'ضعیف'
    })
    const {
        isTrue: isVarietyofProducts1,
        renderYesNoInput: VarietyofProducts1RenderInput,
        setIsTrue: setVarietyofProducts1,
        title: VarietyofProductsTitle1
    } = useYesNoInput({
        id: 'VarietyofProducts1',
        initialvalue: false,
        title: 'عالی'
    })
    const {
        isTrue: isVarietyofProducts2,
        renderYesNoInput: VarietyofProducts2RenderInput,
        setIsTrue: setVarietyofProducts2,
        title: VarietyofProductsTitle2
    } = useYesNoInput({
        id: 'VarietyofProducts2',
        initialvalue: false,
        title: 'معمولی'
    })
    const {
        isTrue: isVarietyofProducts3,
        renderYesNoInput: VarietyofProducts3RenderInput,
        setIsTrue: setVarietyofProducts3,
        title: VarietyofProductsTitle3
    } = useYesNoInput({
        id: 'VarietyofProducts3',
        initialvalue: false,
        title: 'کم'
    })

    useEffect(() => {
        if (isShoppingExperience1) {
            setShoppingExperience2(false);
            setShoppingExperience3(false);
        }
    }, [isShoppingExperience1]);

    useEffect(() => {
        if (isShoppingExperience2) {
            setShoppingExperience1(false);
            setShoppingExperience3(false);
        }
    }, [isShoppingExperience2]);

    useEffect(() => {
        if (isShoppingExperience3) {
            setShoppingExperience1(false);
            setShoppingExperience2(false);
        }
    }, [isShoppingExperience3]);

    useEffect(() => {
        if (isAdminEncounter1) {
            setAdminEncounter2(false);
            setAdminEncounter3(false);
        }
    }, [isAdminEncounter1]);

    useEffect(() => {
        if (isAdminEncounter2) {
            setAdminEncounter1(false);
            setAdminEncounter3(false);
        }
    }, [isAdminEncounter2]);

    useEffect(() => {
        if (isAdminEncounter3) {
            setAdminEncounter1(false);
            setAdminEncounter2(false);
        }
    }, [isAdminEncounter3]);


    useEffect(() => {
        if (isShippingTime1) {
            setShippingTime2(false);
            setShippingTime3(false);
        }
    }, [isShippingTime1]);

    useEffect(() => {
        if (isShippingTime2) {
            setShippingTime1(false);
            setShippingTime3(false);
        }
    }, [isShippingTime2]);

    useEffect(() => {
        if (isShippingTime3) {
            setShippingTime1(false);
            setShippingTime2(false);
        }
    }, [isShippingTime3]);
    useEffect(() => {
        if (isVarietyofProducts1) {
            setVarietyofProducts2(false);
            setVarietyofProducts3(false);
        }
    }, [isVarietyofProducts1]);

    useEffect(() => {
        if (isVarietyofProducts2) {
            setVarietyofProducts1(false);
            setVarietyofProducts3(false);
        }
    }, [isVarietyofProducts2]);

    useEffect(() => {
        if (isVarietyofProducts3) {
            setVarietyofProducts1(false);
            setVarietyofProducts2(false);
        }
    }, [isVarietyofProducts3]);

    const handleSendRecording = async () => {
        if (audioBlob) {
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.addEventListener(
                "loadend",
                () => {
                    if (typeof reader.result === "string") {
                        handleToggleOpenVoiceRecoder();
                    }
                },
                { once: true }
            );
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();

        const returnTitle1 = () => {
            if (isShoppingExperience1) {
                return {
                    title: ShoppingExperienceTitle1,
                    grade: 3
                }
            }
            else if (isShoppingExperience2) {
                return {
                    title: ShoppingExperienceTitle2,
                    grade: 2
                }
            }
            else if (isShoppingExperience3) {
                return {
                    title: ShoppingExperienceTitle3,
                    grade: 1
                }
            } else {
                return {
                    title: '',
                    grade: undefined
                }
            }
        }

        const returnTitle2 = () => {
            if (isAdminEncounter1) {
                return {
                    title: AdminEncounterTitle1,
                    grade: 3
                }
            }
            else if (isAdminEncounter2) {
                return {
                    title: AdminEncounterTitle2,
                    grade: 2
                }
            }
            else if (isAdminEncounter3) {
                return {
                    title: AdminEncounterTitle3,
                    grade: 1
                }
            } else {
                return {
                    title: '',
                    grade: undefined
                }
            }
        }

        const returnTitle3 = () => {
            if (isShippingTime1) {
                return {
                    title: ShippingTimeTitle1,
                    grade: 3
                }
            }
            else if (isShippingTime2) {
                return {
                    title: ShippingTimeTitle2,
                    grade: 2
                }
            }
            else if (isShippingTime3) {
                return {
                    title: ShippingTimeTitle3,
                    grade: 1
                }
            } else {
                return {
                    title: '',
                    grade: undefined
                }
            }
        }

        const returnTitle4 = () => {
            if (isVarietyofProducts1) {
                return {
                    title: VarietyofProductsTitle1,
                    grade: 3
                }
            }
            else if (isVarietyofProducts2) {
                return {
                    title: VarietyofProductsTitle2,
                    grade: 2
                }
            }
            else if (isVarietyofProducts3) {
                return {
                    title: VarietyofProductsTitle3,
                    grade: 1
                }
            } else {
                return {
                    title: '',
                    grade: undefined
                }
            }
        }
        const arrayQuestionAndAnswer = [
            {
                questionText: 'تجربه خرید',
                answerText: returnTitle1()?.title,
                answerGrade: returnTitle1()?.grade
            },
            {
                questionText: 'برخورد ادمین',
                answerText: returnTitle2()?.title,
                answerGrade: returnTitle2()?.grade
            },
            {
                questionText: 'زمان ارسال',
                answerText: returnTitle3()?.title,
                answerGrade: returnTitle3()?.grade
            },
            {
                questionText: 'تنوع محصولات سایت',
                answerText: returnTitle4()?.title,
                answerGrade: returnTitle4()?.grade
            }
        ]

        // for (var i = 0; i < arrayQuestionAndAnswer?.length; i++) {
        //     if (arrayQuestionAndAnswer[i]?.answerText && arrayQuestionAndAnswer[i]?.answerGrade) {
        //         formData.append('List', JSON.stringify(arrayQuestionAndAnswer[i]))
        //     }
        // }


        if (arrayQuestionAndAnswer[0]?.answerText && arrayQuestionAndAnswer[0]?.answerGrade) {
            formData.append('List[0].QuestionText', arrayQuestionAndAnswer[0]?.questionText);
            formData.append('List[0].AnswerText', arrayQuestionAndAnswer[0]?.answerText);
            formData.append('List[0].AnswerGrade', arrayQuestionAndAnswer[0]?.answerGrade);
        }

        if (arrayQuestionAndAnswer[1]?.answerText && arrayQuestionAndAnswer[1]?.answerGrade) {
            formData.append('List[1].QuestionText', arrayQuestionAndAnswer[1]?.questionText);
            formData.append('List[1].AnswerText', arrayQuestionAndAnswer[1]?.answerText);
            formData.append('List[1].AnswerGrade', arrayQuestionAndAnswer[1]?.answerGrade);
        }

        if (arrayQuestionAndAnswer[2]?.answerText && arrayQuestionAndAnswer[2]?.answerGrade) {
            formData.append('List[2].QuestionText', arrayQuestionAndAnswer[2]?.questionText);
            formData.append('List[2].AnswerText', arrayQuestionAndAnswer[2]?.answerText);
            formData.append('List[2].AnswerGrade', arrayQuestionAndAnswer[2]?.answerGrade);
        }

        if (arrayQuestionAndAnswer[3]?.answerText && arrayQuestionAndAnswer[3]?.answerGrade) {
            formData.append('List[3].QuestionText', arrayQuestionAndAnswer[3]?.questionText);
            formData.append('List[3].AnswerText', arrayQuestionAndAnswer[3]?.answerText);
            formData.append('List[3].AnswerGrade', arrayQuestionAndAnswer[3]?.answerGrade);
        }

        if (extraText) {
            formData.append('ExtraText', extraText)
        }

        if (orderId) {
            formData.append('PurchaseRequestId', orderId)
        }

        const b = audioBlob;
        const file = new File([b], Date.now() + "voice.mp3", {
            lastModified: new Date().getTime(),
            type: "audio/mp3",
        });

        if (file) {
            formData.append('ExtraVoiceFile', file)
        }

        apiCaller({
            api: answer_apiCaller.apiCall_Canswers,
            apiArguments: orderId,
            onSuccess: (resp) => {
                if (resp?.status == 200 && resp?.data?.statusCode == 200) {
                    if (resp?.data?.data == true) {
                        apiCaller({
                            api: answer_apiCaller.apiCall_CreateAnswers,
                            apiArguments: formData,
                            onStart: handleOpen,
                            onEnd: handleClose,
                            onSuccess: (resp) => {
                                if (resp?.status == 200 && resp?.data?.statusCode == 200) {
                                    navigate('/?pageId=0');
                                    toast.success('نظر شما با موفقیت ثبت شد')
                                }
                            }
                        })

                    } else {
                        navigate('/message');
                    }
                }
            }
        })
    }

    useEffect(() => {
        console.log(audioBlob)
    }, [audioBlob])


    return (
        <div className='d-flex flex-column register-comment w-100'>
            <div className='register-comment-title d-flex flex-column caro-bg'>
                <div className='d-flex align-items-end gap-1'>
                    <img src={clipboardimg} alt="clipboard" />
                    <h3 className='fw-bold text-white'>ثبت نظر</h3>
                </div>
                <small className="text-white px-2 text-justify">
                    کاربر گرامی برای ثبت نظر خود میتوانید به سفارش خود امتیاز دهید.
                </small>
            </div>
            <div className='w-100 d-flex flex-column p-4 mt-1 gap-3'>
                <div style={{ backgroundImage: `url(${boxsurveyimg})` }} className='w-100 d-flex flex-column justify-content-center align-items-center w-100 box-comment mt-3 p-2'>
                    <h4 className='box-title fw-bold'>تجربه خرید</h4>

                    <div className='items-box w-100 d-flex py-2 justify-content-around align-items-center'>
                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isShoppingExperience1 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isShoppingExperience1 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setShoppingExperience1(true)}>
                            {ShoppingExperience1RenderInput({
                                className: 'col-12'
                            })}
                            <div className='mt-1' style={{ fontSize: '11px', color: 'rgb(94 94 94)' }}>{ }</div>
                        </div>

                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isShoppingExperience2 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isShoppingExperience2 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setShoppingExperience2(true)}>
                            {ShoppingExperience2RenderInput({
                                className: 'col-12'
                            })}
                            <div className='mt-1' style={{ fontSize: '11px', color: 'rgb(94 94 94)' }}>{ }</div>
                        </div>

                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isShoppingExperience3 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isShoppingExperience3 ? '#CB7640' : '#fff'
                            }}
                            className='type-item boxed-item-select py-1' onClick={() => setShoppingExperience3(true)}>
                            {ShoppingExperience3RenderInput({
                                className: 'col-12'
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ backgroundImage: `url(${boxsurveyimg2})` }} className='w-100 d-flex flex-column justify-content-center align-items-center w-100 box-comment mt-3 p-2'>
                    <h4 className='box-title fw-bold'>تنوع محصولات سایت</h4>

                    <div className='items-box w-100 d-flex py-2 justify-content-around align-items-center'>
                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isVarietyofProducts1 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isVarietyofProducts1 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setVarietyofProducts1(true)}>
                            {VarietyofProducts1RenderInput({
                                className: 'col-12'
                            })}
                            <div className='mt-1' style={{ fontSize: '11px', color: 'rgb(94 94 94)' }}>{ }</div>
                        </div>

                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isVarietyofProducts2 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isVarietyofProducts2 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setVarietyofProducts2(true)}>
                            {VarietyofProducts2RenderInput({
                                className: 'col-12'
                            })}
                            <div className='mt-1' style={{ fontSize: '11px', color: 'rgb(94 94 94)' }}>{ }</div>
                        </div>

                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isVarietyofProducts3 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isVarietyofProducts3 ? '#CB7640' : '#fff'
                            }}
                            className='type-item boxed-item-select py-1' onClick={() => setVarietyofProducts3(true)}>
                            {VarietyofProducts3RenderInput({
                                className: 'col-12'
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ backgroundImage: `url(${boxsurveyimg3})` }} className='w-100 d-flex flex-column justify-content-center align-items-center w-100 box-comment mt-3 p-2'>
                    <h4 className='box-title fw-bold'>نحوه پاسخگویی</h4>

                    <div className='items-box w-100 d-flex py-2 justify-content-around align-items-center'>
                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isAdminEncounter1 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isAdminEncounter1 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setAdminEncounter1(true)}>
                            {AdminEncounter1RenderInput({
                                className: 'col-12'
                            })}
                            <div className='mt-1' style={{ fontSize: '11px', color: 'rgb(94 94 94)' }}>{ }</div>
                        </div>

                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isAdminEncounter2 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isAdminEncounter2 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setAdminEncounter2(true)}>
                            {AdminEncounter2RenderInput({
                                className: 'col-12'
                            })}
                            <div className='mt-1' style={{ fontSize: '11px', color: 'rgb(94 94 94)' }}>{ }</div>
                        </div>

                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isAdminEncounter3 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isAdminEncounter3 ? '#CB7640' : '#fff'
                            }}
                            className='type-item boxed-item-select py-1' onClick={() => setAdminEncounter3(true)}>
                            {AdminEncounter3RenderInput({
                                className: 'col-12'
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ backgroundImage: `url(${boxsurveyimg4})` }} className='w-100 d-flex flex-column justify-content-center align-items-center w-100 box-comment mt-3 p-2'>
                    <h4 className='box-title fw-bold'>زمان ارسال</h4>

                    <div className='items-box w-100 d-flex py-2 justify-content-around align-items-center'>
                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isShippingTime1 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isShippingTime1 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setShippingTime1(true)}>
                            {ShippingTime1RenderInput({
                                className: 'col-12'
                            })}
                            <div className='mt-1' style={{ fontSize: '11px', color: 'rgb(94 94 94)' }}>{ }</div>
                        </div>

                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isShippingTime2 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isShippingTime2 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setShippingTime2(true)}>
                            {ShippingTime2RenderInput({
                                className: 'col-12'
                            })}
                            <div className='mt-1' style={{ fontSize: '11px', minWidth: 'fit-content', color: 'rgb(94 94 94)' }}>{ }</div>
                        </div>

                        <div
                            style={{
                                maxWidth: '75px',
                                zIndex: '1',
                                border: '3px solid #CB7640',
                                color: isShippingTime3 ? '#ffff' : '#CB7640',
                                borderRadius: '20px',
                                backgroundColor: isShippingTime3 ? '#CB7640' : '#fff'
                            }}
                            className='w-100 d-flex type-item boxed-item-select py-1 cursor-pointer' onClick={() => setShippingTime3(true)}>
                            {ShippingTime3RenderInput({
                                className: 'col-12'
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-100 mt-3">
                    <label className="mb-2 fs-6 fw-bold" htmlFor="extra-input">
                        توضیحات
                    </label>
                    <textarea
                        id="extra-input"
                        className="form-control order-input disc"
                        style={{ resize: "none" }}
                        onChange={(e) => setExtraText(e?.target?.value)}
                        rows={6}
                    ></textarea>
                </div>
                <div className="mt-4 mb-3 d-flex flex-column">
                    <div className='w-100 d-flex'>
                        <div className='w-100 d-flex text-dark'>
                            <MdPlayArrow style={{ rotate: '180deg', transform: 'translateY(-4px)', minWidth: 'fit-content', fontSize: '18px' }} />
                            <span className='voice-text fw-bold lh-base'>میتوانید به صورت خلاصه توضیحات خود را ضبط کنید و برای ما بفرستید</span>
                        </div>
                        {/* {audioBlob ? (
                        <Button
                            onClick={cancelRecordingAgain}
                            variant="contained"
                            color="error"
                        >
                            ضبط دوباره
                        </Button>
                    ) : (
                        !recording &&
                        <Button
                            onClick={startRecording}
                            variant="contained"
                            color="info"
                        >
                            ضبط صدا
                        </Button>
                    )}
                    {recording && !audioBlob && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={cancelRecording}
                        >
                            پایان ضبط
                        </Button>
                    )} */}
                        <div onClick={!recording && !audioBlob ? startRecording : cancelRecording} className="mic-container">
                            <div className={recording ? 'circle active' : 'circle'}>
                                {/* <PiMicrophone fontSize={22} color={recording ? '#fff' : '#000'} /> */}
                                <img style={{ width: '100%', maxWidth: '32px' }} src={recording ? stopvoiceImg : microphoneImg} alt="microphone" />
                            </div>
                        </div>
                    </div>
                    {audioBlob && (
                        <div className="mt-3" dir="ltr">
                            <audio controls className='w-100'>
                                <source src={URL.createObjectURL(audioBlob)} type="audio/mp3" />
                            </audio>
                            <Button
                                variant="contained"
                                color="error"
                                className="mt-4 w-100"
                                onClick={cancelRecordingAgain}
                            >
                                ضبط دوباره
                            </Button>
                        </div>
                    )}
                </div>
                <div className='w-100 d-flex gap-3'>
                    <Button
                        fullWidth
                        onClick={handleSubmit}
                        className='mt-3 py-2 fs-7 rounded-3 fw-bold'
                        variant='contained'
                        color='primary'
                    >ثبت نظر
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => navigate('/?pageId=0')}
                        sx={{ backgroundColor: '#C2C2C2', color: '#232323', '&:hover': { backgroundColor: '#C2C2C2' } }}
                        className='mt-3 py-2 fs-7 rounded-3 fw-bold'
                        variant='text'
                        color='primary'
                    >بازگشت به خانه
                    </Button>
                </div>
            </div>
            {/* <Dialog
                open={false}
                onClose={handleToggleOpenVoiceRecoder}
                maxWidth="xs"
                className="w-100"
            >
                <DialogContent>
                    <div className="d-flex flex-column w-100 pt-3">
                        <span>* حداکثر زمان وویس ۱ دقیقه میباشد</span>
                        <div className="d-flex w-100 justify-content-center">
                            {!recording ? (
                                <BiSolidMicrophone fontSize={60} color="red" />
                            ) : (
                                <FaStopCircle fontSize={60} color="red" />
                            )}
                        </div>
                        {recording && (
                            <p className="text-center mb-0 mt-3">در حال ضبط ...</p>
                        )}
                        {audioBlob && (
                            <div className="mt-3" dir="ltr">
                                <AudioPlayer
                                    customControlsSection={[
                                        "MAIN_CONTROLS",
                                        "ADDITIONAL_CONTROLS",
                                        "VOLUME_CONTROLS",
                                    ]}
                                    onPause={() => setRecording(false)}
                                    onStop={() => setRecording(false)}
                                    src={URL.createObjectURL(audioBlob)}
                                />
                            </div>
                        )}
                        {!recording && !audioBlob && (
                            <Button
                                style={{
                                    backgroundColor: "rgba(26, 182, 70, 1)",
                                    color: "#fff",
                                }}
                                onClick={startRecording}
                                className="mt-4 "
                            >
                                شروع ضبط
                            </Button>
                        )}
                        {recording && (
                            <Button
                                variant="contained"
                                color="secondary"
                                className="mt-4 "
                                onClick={cancelRecording}
                            >
                                پایان ضبط
                            </Button>
                        )}
                        {audioBlob && (
                            <>
                                <Button
                                    variant="contained"
                                    color="error"
                                    className="mt-4 "
                                    onClick={cancelRecordingAgain}
                                >
                                    ضبط دوباره
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    className="mt-3 "
                                    onClick={handleSendRecording}
                                >
                                    تایید ضبط
                                </Button>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog> */}
        </div>
    )
}

export default RegisterComment;


export const useYesNoInput = ({
    title = "",
    id = "",
    initialvalue = false,
}) => {
    const [isTrue, setIsTrue] = useState(initialvalue);
    const toggleIsTrue = () => {
        setIsTrue(!isTrue);
    };

    const renderYesNoInput = ({ className = "" }) => {
        return (
            <div className={`${className} d-flex align-items-center`}>
                <div className="m-0 p-0 d-flex w-100 justify-content-center align-items-center">
                    <label htmlFor={id} className="fw-bold cursor-pointer" style={{ fontSize: "13px", width: '80px', textAlign: 'center' }}>
                        {title}
                    </label>
                    <Radio
                        style={{ display: 'none' }}
                        id={id}
                        checked={isTrue}
                        onChange={(e) => setIsTrue(e.target.checked)}

                        sx={{
                            backgroundColor: '#b3b3b3',
                            color: '#b3b3b3',
                            '&.Mui-checked': {
                                border: 'none'
                            },
                        }}
                        color="primary"
                        className="p-0"
                    />
                </div>
            </div>
        );
    };

    return { isTrue, renderYesNoInput, toggleIsTrue, setIsTrue, title };
};